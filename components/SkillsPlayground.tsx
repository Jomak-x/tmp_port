"use client";

import { skillClusters, skills } from "@/data/skills";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type BubbleState = "floating" | "dragging" | "popped";

type RuntimeBubble = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  state: BubbleState;
  previousState: Exclude<BubbleState, "dragging">;
  phase: number;
  bobPhase: number;
  wobblePhase: number;
  pressure: number;
  popAt: number;
  respawnAt: number;
  rotation: number;
  rotationVelocity: number;
};

type PointerState = {
  inside: boolean;
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  bubbleIndex: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  offsetX: number;
  offsetY: number;
  moved: boolean;
  previousState: Exclude<BubbleState, "dragging">;
  releaseVx: number;
  releaseVy: number;
};

const STAR_POINTS = [
  { left: "6%", top: "12%", size: 2.2, opacity: 0.58 },
  { left: "15%", top: "18%", size: 1.2, opacity: 0.4 },
  { left: "22%", top: "8%", size: 1.8, opacity: 0.44 },
  { left: "28%", top: "20%", size: 1.1, opacity: 0.32 },
  { left: "36%", top: "11%", size: 1.7, opacity: 0.48 },
  { left: "44%", top: "16%", size: 2.4, opacity: 0.36 },
  { left: "52%", top: "9%", size: 1.2, opacity: 0.3 },
  { left: "62%", top: "19%", size: 1.9, opacity: 0.48 },
  { left: "70%", top: "10%", size: 2, opacity: 0.4 },
  { left: "78%", top: "16%", size: 1.1, opacity: 0.34 },
  { left: "86%", top: "8%", size: 2.6, opacity: 0.46 },
  { left: "91%", top: "21%", size: 1.2, opacity: 0.32 },
  { left: "10%", top: "35%", size: 1, opacity: 0.26 },
  { left: "83%", top: "32%", size: 1.3, opacity: 0.24 },
  { left: "58%", top: "29%", size: 1.4, opacity: 0.22 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clampMagnitude(x: number, y: number, max: number) {
  const magnitude = Math.hypot(x, y);

  if (magnitude <= max || magnitude === 0) {
    return { x, y };
  }

  const ratio = max / magnitude;
  return { x: x * ratio, y: y * ratio };
}

function createBubble(
  index: number,
  width: number,
  height: number,
  compact: boolean,
  topBound: number
): RuntimeBubble {
  const skill = skills[index];
  const baseRadius = Math.round(
    (compact ? 36 : 44) +
      skill.intensity * (compact ? 11 : 15) +
      skill.bubbleScale * 6
  );

  return {
    x: randomRange(baseRadius, width - baseRadius),
    y: randomRange(topBound + baseRadius, height - baseRadius * 1.5),
    vx: randomRange(-0.12, 0.12) * (0.8 + skill.warmth * 0.55),
    vy: randomRange(-0.045, 0.045) * (0.8 + skill.intensity * 0.32),
    radius: baseRadius,
    baseRadius,
    state: "floating",
    previousState: "floating",
    phase: index * 0.73 + skill.warmth * 8,
    bobPhase: index * 0.91 + skill.intensity * 5,
    wobblePhase: index * 1.27 + skill.warmth * 11,
    pressure: 0,
    popAt: 0,
    respawnAt: 0,
    rotation: randomRange(-8, 8),
    rotationVelocity: randomRange(-0.04, 0.04),
  };
}

function respawnBubble(
  bubble: RuntimeBubble,
  index: number,
  width: number,
  compact: boolean,
  topBound: number
) {
  const skill = skills[index];

  bubble.x = randomRange(bubble.baseRadius, width - bubble.baseRadius);
  bubble.y = topBound - bubble.baseRadius - randomRange(24, compact ? 90 : 140);
  bubble.vx = randomRange(-0.12, 0.12) * (0.75 + skill.warmth * 0.45);
  bubble.vy = randomRange(0.02, 0.09);
  bubble.radius = bubble.baseRadius;
  bubble.state = "floating";
  bubble.previousState = "floating";
  bubble.pressure = 0;
  bubble.popAt = 0;
  bubble.respawnAt = 0;
  bubble.rotation = randomRange(-10, 10);
  bubble.rotationVelocity = randomRange(-0.03, 0.03);
}

export default function SkillsPlayground() {
  const [compact, setCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const runtimeRef = useRef<RuntimeBubble[]>([]);
  const boundsRef = useRef({ width: 0, height: 0, topBound: 0 });
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const pointerRef = useRef<PointerState>({ inside: false, x: 0, y: 0 });
  const timeRef = useRef(0);
  const activeCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 900px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncMedia = () => {
      setCompact(compactQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
    };

    syncMedia();
    compactQuery.addEventListener("change", syncMedia);
    reducedMotionQuery.addEventListener("change", syncMedia);

    return () => {
      compactQuery.removeEventListener("change", syncMedia);
      reducedMotionQuery.removeEventListener("change", syncMedia);
    };
  }, []);

  useEffect(() => {
    const field = fieldRef.current;
    const glow = glowRef.current;

    if (!field) {
      return;
    }

    const resetBubbles = () => {
      const rect = field.getBoundingClientRect();
      const topBound = compact ? 182 : 212;

      boundsRef.current = { width: rect.width, height: rect.height, topBound };
      runtimeRef.current = skills.map((_, index) =>
        createBubble(index, rect.width, rect.height, compact, topBound)
      );
    };

    resetBubbles();

    const observer = new ResizeObserver(resetBubbles);
    observer.observe(field);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      pointerRef.current.x = pointerX;
      pointerRef.current.y = pointerY;

      const drag = dragRef.current;

      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }

      const bubble = runtimeRef.current[drag.bubbleIndex];
      if (!bubble) {
        return;
      }

      const movedDistance = Math.hypot(
        event.clientX - drag.startX,
        event.clientY - drag.startY
      );

      if (!drag.moved && movedDistance > 8) {
        drag.moved = true;
        bubble.previousState = drag.previousState;
        bubble.state = "dragging";
      }

      if (!drag.moved) {
        return;
      }

      const dt = Math.max(event.timeStamp - drag.lastTime, 16);
      const nextX = clamp(
        pointerX + drag.offsetX,
        bubble.baseRadius,
        rect.width - bubble.baseRadius
      );
      const nextY = clamp(
        pointerY + drag.offsetY,
        0,
        rect.height - bubble.baseRadius * 0.4
      );

      const instantVx = ((nextX - bubble.x) / dt) * (16.666 / 4.1);
      const instantVy = ((nextY - bubble.y) / dt) * (16.666 / 3.8);

      drag.releaseVx = drag.releaseVx * 0.26 + instantVx * 0.74;
      drag.releaseVy = drag.releaseVy * 0.26 + instantVy * 0.74;
      bubble.vx = drag.releaseVx;
      bubble.vy = drag.releaseVy;
      bubble.x = nextX;
      bubble.y = nextY;
      bubble.pressure = clamp(bubble.pressure + 0.1, 0, 1);

      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = event.timeStamp;
    };

    const handlePointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current;

      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }

      const bubble = runtimeRef.current[drag.bubbleIndex];

      if (bubble) {
        if (drag.moved) {
          bubble.state = drag.previousState;
          bubble.previousState = drag.previousState;
          const releaseBoost = compact ? 6.2 : 7.8;
          bubble.vx = drag.releaseVx * releaseBoost;
          bubble.vy = drag.releaseVy * releaseBoost;
          const clampedRelease = clampMagnitude(
            bubble.vx,
            bubble.vy,
            compact ? 8.6 : 11
          );
          bubble.vx = clampedRelease.x;
          bubble.vy = clampedRelease.y;
          bubble.pressure = 0.72;
        } else if (bubble.state !== "popped") {
          bubble.state = "popped";
          bubble.previousState = "popped";
          bubble.popAt = timeRef.current;
          bubble.respawnAt = timeRef.current + (compact ? 3000 : 3600);
          bubble.vx *= 0.3;
          bubble.vy = Math.max(0.08, Math.abs(bubble.vy) * 0.3);
          bubble.rotationVelocity += randomRange(-0.16, 0.16);
          bubble.pressure = 1;
        }
      }

      dragRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);

    let lastTime = 0;

    const render = (timestamp: number) => {
      const { width, height, topBound } = boundsRef.current;
      const motionScale = reducedMotion ? 0.38 : 1;
      const pointer = pointerRef.current;

      if (!width || !height) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      if (!lastTime) {
        lastTime = timestamp;
      }

      const delta = Math.min((timestamp - lastTime) / 16.666, 1.6);
      lastTime = timestamp;
      timeRef.current = timestamp;

      for (let i = 0; i < runtimeRef.current.length; i += 1) {
        const bubble = runtimeRef.current[i];
        const skill = skills[i];
        const node = bubbleRefs.current[i];

        if (!bubble || !node) {
          continue;
        }

        if (bubble.state === "floating") {
          bubble.vx +=
            Math.sin(timestamp * 0.00013 * motionScale + bubble.phase) *
            0.0019 *
            delta;
          bubble.vx +=
            Math.cos(timestamp * 0.00007 * motionScale + bubble.wobblePhase) *
            0.00095 *
            delta;
          bubble.vy +=
            Math.sin(timestamp * 0.00017 * motionScale + bubble.bobPhase) *
            0.0017 *
            delta;
          bubble.vy +=
            Math.cos(timestamp * 0.00011 * motionScale + bubble.phase * 0.8) *
            0.00095 *
            delta;

          if (bubble.y < topBound + bubble.baseRadius * 0.4) {
            bubble.vy += 0.01 * delta;
          }

          if (bubble.y > height - bubble.baseRadius * 1.15) {
            bubble.vy -= 0.014 * delta;
          }

          const speed = Math.hypot(bubble.vx, bubble.vy);
          const extraDrag =
            speed > (compact ? 4.8 : 6.2)
              ? 0.972
              : speed > (compact ? 3.2 : 4.1)
              ? 0.984
              : speed > (compact ? 1.8 : 2.4)
              ? 0.992
              : 1;

          bubble.vx *= (reducedMotion ? 0.9968 : 0.9988) * extraDrag;
          bubble.vy *= (reducedMotion ? 0.9968 : 0.9982) * extraDrag;
          bubble.x += bubble.vx * 5.2 * delta;
          bubble.y += bubble.vy * 4.7 * delta;
          bubble.pressure *= 0.982;
        } else if (bubble.state === "popped") {
          const sinkTime = timestamp - bubble.popAt;
          const popProgress = clamp(sinkTime / 240, 0, 1);
          const sinkProgress = clamp(sinkTime / (compact ? 2600 : 3200), 0, 1);
          const popPulse = Math.sin(clamp(sinkTime / 210, 0, 1) * Math.PI);

          bubble.radius =
            bubble.baseRadius *
            (1 + popPulse * 0.06 - popProgress * 0.08 - sinkProgress * 0.08);

          if (sinkTime < 120) {
            bubble.vy -= (reducedMotion ? 0.012 : 0.03) * delta;
          } else if (sinkTime < 220) {
            bubble.vy += (reducedMotion ? 0.001 : 0.004) * delta;
          }

          bubble.vx +=
            Math.sin(timestamp * 0.00105 * motionScale + bubble.phase * 1.2) *
            0.009 *
            delta;
          bubble.vy += (reducedMotion ? 0.006 : 0.012) * delta;
          bubble.vx *= 0.991;
          bubble.vy *= 0.994;
          bubble.x += bubble.vx * 4.4 * delta;
          bubble.y += bubble.vy * 5.6 * delta;
          bubble.rotationVelocity +=
            Math.sin(timestamp * 0.001 * motionScale + bubble.wobblePhase) *
            0.003;
          bubble.pressure *= 0.92;

          if (
            bubble.y > height + bubble.baseRadius * 1.8 &&
            timestamp >= bubble.respawnAt
          ) {
            respawnBubble(bubble, i, width, compact, topBound);
          }
        } else {
          bubble.radius = bubble.baseRadius;
        }

        if (bubble.state !== "dragging") {
          const clampedVelocity = clampMagnitude(
            bubble.vx,
            bubble.vy,
            bubble.state === "popped"
              ? compact
                ? 0.4
                : 0.5
              : compact
              ? 8
              : 10.2
          );
          bubble.vx = clampedVelocity.x;
          bubble.vy = clampedVelocity.y;
        }

        if (bubble.state !== "dragging") {
          if (bubble.x < -bubble.baseRadius) {
            bubble.x = width + bubble.baseRadius * 0.9;
          } else if (bubble.x > width + bubble.baseRadius) {
            bubble.x = -bubble.baseRadius * 0.9;
          }
        }

        bubble.rotation += bubble.rotationVelocity * delta;
        bubble.rotationVelocity *= bubble.state === "popped" ? 0.992 : 0.985;

        const sinkTime =
          bubble.state === "popped" ? timestamp - bubble.popAt : 0;
        const localPulse =
          1 +
          Math.sin(timestamp * 0.00095 * motionScale + bubble.phase) *
            0.012 *
            motionScale;
        const dragScale = bubble.state === "dragging" ? 1.08 : 1;
        const popBurst =
          bubble.state === "popped"
            ? Math.sin(clamp(sinkTime / 220, 0, 1) * Math.PI)
            : 0;
        const popFlash =
          bubble.state === "popped" ? 1 - clamp(sinkTime / 170, 0, 1) : 0;
        const popHalo =
          bubble.state === "popped" ? 1 - clamp(sinkTime / 420, 0, 1) : 0;
        const sinkProgress =
          bubble.state === "popped"
            ? clamp(sinkTime / (compact ? 2600 : 3200), 0, 1)
            : 0;
        const pressureScale = 1 + bubble.pressure * 0.05;
        const scaleX =
          localPulse *
          dragScale *
          pressureScale *
          (bubble.state === "popped"
            ? 1 + popBurst * 0.24 - sinkProgress * 0.12
            : 1);
        const scaleY =
          localPulse *
          dragScale *
          pressureScale *
          (bubble.state === "popped"
            ? 1 - popBurst * 0.16 - sinkProgress * 0.26
            : 1);
        const opacity =
          bubble.state === "popped" ? 0.96 - sinkProgress * 0.32 : 1;
        const activeFilter = activeCategoryRef.current;
        const filteredOut =
          activeFilter !== null && skill.category !== activeFilter;
        const blur =
          bubble.state === "popped" ? `${0.2 + sinkProgress * 1.6}px` : "0px";
        const labelOpacity =
          bubble.state === "popped"
            ? `${1 - clamp(sinkTime / 520, 0, 1) * 0.72}`
            : filteredOut
            ? "0"
            : "1";
        const shellOpacity =
          bubble.state === "popped"
            ? `${0.9 - sinkProgress * 0.24}`
            : filteredOut
            ? "0"
            : "1";
        const ringScale =
          bubble.state === "popped" ? `${1 + popBurst * 0.55}` : "1";
        const ringOpacity =
          bubble.state === "popped"
            ? `${Math.max(0, 0.72 - sinkProgress * 0.58)}`
            : "0";
        const flashOpacity =
          bubble.state === "popped" ? `${Math.max(0, popFlash * 0.82)}` : "0";
        const splashOpacity =
          bubble.state === "popped" ? `${Math.max(0, popHalo * 0.38)}` : "0";
        const splashScale =
          bubble.state === "popped"
            ? `${1 + popBurst * 0.9 + sinkProgress * 0.4}`
            : "1";
        const wakeOpacity =
          bubble.state === "popped"
            ? `${Math.max(0, 0.34 - sinkProgress * 0.2)}`
            : "0";
        const wakeScale =
          bubble.state === "popped" ? `${0.8 + sinkProgress * 1.7}` : "0.6";

        node.style.width = `${bubble.radius * 2}px`;
        node.style.height = `${bubble.radius * 2}px`;
        node.style.transform = `translate3d(${bubble.x - bubble.radius}px, ${
          bubble.y - bubble.radius
        }px, 0) scale(${scaleX}, ${scaleY}) rotate(${bubble.rotation}deg)`;
        node.style.opacity = filteredOut ? "0" : `${opacity}`;
        node.style.visibility = filteredOut ? "hidden" : "visible";
        node.style.pointerEvents = filteredOut ? "none" : "auto";
        node.style.filter = `blur(${blur})`;
        node.style.boxShadow = `0 20px 48px ${skill.glow}, inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -16px 26px rgba(3,7,18,0.28)`;
        node.style.zIndex = filteredOut
          ? "1"
          : bubble.state === "dragging"
          ? "30"
          : bubble.state === "popped"
          ? "18"
          : "14";
        node.style.setProperty("--bubble-shell-opacity", shellOpacity);
        node.style.setProperty("--bubble-label-opacity", labelOpacity);
        node.style.setProperty("--bubble-ring-scale", ringScale);
        node.style.setProperty("--bubble-ring-opacity", ringOpacity);
        node.style.setProperty("--bubble-flash-opacity", flashOpacity);
        node.style.setProperty("--bubble-splash-opacity", splashOpacity);
        node.style.setProperty("--bubble-splash-scale", splashScale);
        node.style.setProperty("--bubble-wake-opacity", wakeOpacity);
        node.style.setProperty("--bubble-wake-scale", wakeScale);
      }

      if (glow) {
        const glowX = pointer.inside ? pointer.x : width * 0.5;
        const glowY = pointer.inside ? pointer.y : height * 0.55;

        glow.style.background = `radial-gradient(340px circle at ${glowX}px ${glowY}px, rgba(255,255,255,${
          pointer.inside ? 0.07 : 0.035
        }), transparent 56%), radial-gradient(540px circle at ${glowX}px ${glowY}px, rgba(79,140,255,${
          pointer.inside ? 0.09 : 0.04
        }), transparent 64%), radial-gradient(760px circle at ${
          width * 0.5
        }px ${height * 0.88}px, rgba(255,79,179,0.06), transparent 62%)`;
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [compact, reducedMotion]);

  const handleFieldPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const field = fieldRef.current;

    if (!field) {
      return;
    }

    const rect = field.getBoundingClientRect();
    pointerRef.current.inside = true;
    pointerRef.current.x = event.clientX - rect.left;
    pointerRef.current.y = event.clientY - rect.top;
  };

  const handleBubblePointerDown = (
    index: number,
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const field = fieldRef.current;
    const bubble = runtimeRef.current[index];

    if (!field || !bubble) {
      return;
    }

    event.preventDefault();
    const rect = field.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    pointerRef.current.inside = true;
    pointerRef.current.x = localX;
    pointerRef.current.y = localY;

    dragRef.current = {
      pointerId: event.pointerId,
      bubbleIndex: index,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      offsetX: bubble.x - localX,
      offsetY: bubble.y - localY,
      moved: false,
      previousState: bubble.state === "popped" ? "popped" : "floating",
      releaseVx: bubble.vx,
      releaseVy: bubble.vy,
    };
  };

  const ringStyle: CSSProperties = {
    transform: "scale(var(--bubble-ring-scale, 1))",
    opacity: "var(--bubble-ring-opacity, 0)",
  };

  const shellStyle: CSSProperties = {
    opacity: "var(--bubble-shell-opacity, 1)",
  };

  const labelStyle: CSSProperties = {
    opacity: "var(--bubble-label-opacity, 1)",
  };

  const wakeStyle: CSSProperties = {
    opacity: "var(--bubble-wake-opacity, 0)",
    transform: "translateX(-50%) scaleY(var(--bubble-wake-scale, 0.6))",
  };

  const flashStyle: CSSProperties = {
    opacity: "var(--bubble-flash-opacity, 0)",
  };

  const splashStyle: CSSProperties = {
    opacity: "var(--bubble-splash-opacity, 0)",
    transform: "scale(var(--bubble-splash-scale, 1))",
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#080816] text-white">
      <section
        ref={fieldRef}
        onPointerMove={handleFieldPointerMove}
        onPointerEnter={handleFieldPointerMove}
        onPointerLeave={() => {
          pointerRef.current.inside = false;
        }}
        className="relative min-h-screen touch-none overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(114,84,255,0.18),transparent_24%),radial-gradient(circle_at_18%_24%,rgba(84,157,255,0.18),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(255,98,185,0.16),transparent_22%),radial-gradient(circle_at_50%_92%,rgba(255,169,71,0.12),transparent_28%),linear-gradient(180deg,rgba(10,11,30,0.98),rgba(5,7,18,1))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:58px_58px] opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />

        {STAR_POINTS.map((star, index) => (
          <span
            key={`${star.left}-${star.top}-${index}`}
            className="pointer-events-none absolute rounded-full bg-white blur-[0.3px]"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 8}px rgba(255,255,255,${
                star.opacity * 0.55
              })`,
            }}
          />
        ))}

        <div className="relative z-10 px-5 pb-4 pt-26 text-center md:px-8 md:pt-32">
          <p className="text-[0.76rem] uppercase tracking-[0.46em] text-white/42 md:text-[0.88rem]">
            Space Bubbles
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold tracking-tight text-white md:text-[3.5rem]">
            Skills
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/62 md:text-lg">
            Technical skills pulled from my resume, grouped by the places I use
            them most.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/72">
            {skillClusters.map((cluster) => (
              <button
                key={cluster.category}
                type="button"
                onClick={() =>
                  setActiveCategory((current) =>
                    current === cluster.category ? null : cluster.category
                  )
                }
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  activeCategory === cluster.category
                    ? "bg-white/8"
                    : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/6"
                }`}
                style={{
                  borderColor:
                    activeCategory === cluster.category
                      ? `${cluster.accent}66`
                      : "transparent",
                  backgroundColor:
                    activeCategory === cluster.category
                      ? `${cluster.accent}16`
                      : undefined,
                  color:
                    activeCategory === null ||
                    activeCategory === cluster.category
                      ? cluster.accent
                      : `${cluster.accent}aa`,
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: cluster.accent,
                    boxShadow: `0 0 20px ${cluster.accent}`,
                  }}
                />
                <span>{cluster.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                activeCategory === null
                  ? "border-white/18 bg-white/10 text-white"
                  : "border-transparent bg-transparent text-white/62 hover:border-white/10 hover:bg-white/6"
              }`}
            >
              All
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-white/48 backdrop-blur md:text-[0.68rem]">
          Drag/fling to move. Click to pop.
        </div>

        {skills.map((skill, index) => (
          <div
            key={skill.id}
            ref={(node) => {
              bubbleRefs.current[index] = node;
            }}
            onPointerDown={(event) => handleBubblePointerDown(index, event)}
            className="absolute left-0 top-0 flex cursor-grab select-none items-center justify-center rounded-full border border-white/18 px-4 text-center text-white backdrop-blur-[2px] will-change-transform active:cursor-grabbing"
            style={{
              background: skill.surface,
              backgroundBlendMode: "screen, screen, normal, normal",
              textShadow: "0 1px 8px rgba(4,7,20,0.6)",
            }}
            aria-label={`${skill.name}: ${skill.blurb}`}
            role="button"
            tabIndex={0}
          >
            <span className="pointer-events-none absolute inset-[4%] rounded-full border border-white/10" />
            <span
              className="pointer-events-none absolute inset-[-16%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24),transparent_58%)] blur-[8px]"
              style={splashStyle}
            />
            <span
              className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.34),transparent_16%),radial-gradient(circle_at_62%_62%,rgba(255,255,255,0.06),transparent_20%)]"
              style={flashStyle}
            />
            <span
              className="pointer-events-none absolute inset-[-8%] rounded-full border border-white/18"
              style={ringStyle}
            />
            <span
              className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.22),transparent_22%),radial-gradient(circle_at_68%_76%,rgba(12,18,35,0.14),transparent_34%)]"
              style={shellStyle}
            />
            <span className="pointer-events-none absolute left-[19%] top-[17%] h-[16%] w-[30%] rotate-[-24deg] rounded-full bg-white/22 blur-[6px]" />
            <span className="pointer-events-none absolute left-[57%] top-[29%] h-[10%] w-[12%] rounded-full bg-white/10 blur-[4px]" />
            <span className="pointer-events-none absolute inset-[13%] rounded-full border border-white/5" />
            <span className="pointer-events-none absolute inset-x-[24%] bottom-[15%] h-[12%] rounded-full bg-black/8 blur-[10px]" />
            <span
              className="pointer-events-none absolute left-1/2 top-[78%] h-[58%] w-[28%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02),transparent)] blur-[10px]"
              style={wakeStyle}
            />
            <span
              className="relative px-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] md:text-[0.88rem]"
              style={labelStyle}
            >
              {skill.label}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
