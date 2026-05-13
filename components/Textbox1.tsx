type TextBoxProps = {
  text: string;
  height?: string;
  width?: string;
};

export default function Textbox({
  text,
  height = "h-90",
  width = "w-130",
}: TextBoxProps) {
  return (
    <div
      className={`relative ${height} ${width} overflow-hidden rounded-2xl border-2 border-orange-400 bg-orange-400/10 shadow-2xl shadow-black/20`}
    >
      <div className="h-full overflow-y-auto p-5 text-base leading-8 text-white/78 sm:p-6">
        {text}
      </div>
    </div>
  );
}
