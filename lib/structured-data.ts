import { absoluteUrl, siteConfig } from "@/lib/site";

export function personId() {
  return `${absoluteUrl("/")}#jakob-laise`;
}

export function websiteId() {
  return `${absoluteUrl("/")}#website`;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items.at(-1)?.path || "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#item-list` },
      },
      breadcrumbJsonLd([
        { name: "Jakob Laise", path: "/" },
        { name, path },
      ]),
      {
        "@type": "ItemList",
        "@id": `${url}#item-list`,
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
    ],
  };
}
