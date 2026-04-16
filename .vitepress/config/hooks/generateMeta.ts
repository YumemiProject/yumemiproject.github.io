import type { HeadConfig, TransformContext } from "vitepress";

import type { DocsPageData } from "../../theme/plugins/section";

function generateMeta(context: TransformContext, hostname: string) {
  const head: HeadConfig[] = [];
  const { pageData }: { pageData: DocsPageData } = context;

  const pageTitle = pageData.frontmatter.title ?? pageData.title;

  const url = `${hostname}/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2")}`;

  // Canonical
  head.push(["link", { rel: "canonical", href: url }]);
  head.push(["meta", { property: "og:url", content: url }]);
  head.push(["meta", { name: "twitter:url", content: url }]);
  head.push(["meta", { name: "twitter:card", content: "summary_large_image" }]);

  if (pageData.frontmatter.theme) {
    head.push(["meta", { name: "theme-color", content: pageData.frontmatter.theme }]);
  }

  head.push(["meta", { property: "og:type", content: pageData.frontmatter.type ?? "website" }]);

  if (pageData.frontmatter.customMetaTitle) {
    head.push([
      "meta",
      {
        property: "og:title",
        content: pageData.frontmatter.customMetaTitle,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:title",
        content: pageData.frontmatter.customMetaTitle,
      },
    ]);
    head.push(["meta", { property: "og:site_name", content: "" }]);
  } else {
    head.push(["meta", { property: "og:title", content: pageTitle }]);
    head.push(["meta", { name: "twitter:title", content: pageTitle }]);
  }
  if (pageData.frontmatter.description) {
    head.push([
      "meta",
      {
        property: "og:description",
        content: pageData.frontmatter.description,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:description",
        content: pageData.frontmatter.description,
      },
    ]);
  }
  if (pageData.frontmatter.image) {
    head.push([
      "meta",
      {
        property: "og:image",
        content: `${hostname}/${pageData.frontmatter.image.replace(/^\//, "")}`,
      },
    ]);
    head.push([
      "meta",
      {
        name: "twitter:image",
        content: `${hostname}/${pageData.frontmatter.image.replace(/^\//, "")}`,
      },
    ]);
  } else {
    const url = pageData.filePath.replace("index.md", "").replace(".md", "");
    const imageUrl = `${url}/__og_image__/og.png`.replace(/\/\//g, "/").replace(/^\//, "");

    head.push(["meta", { property: "og:image", content: `${hostname}/${imageUrl}` }]);
    head.push(["meta", { property: "og:image:width", content: "1200" }]);
    head.push(["meta", { property: "og:image:height", content: "628" }]);
    head.push(["meta", { property: "og:image:type", content: "image/png" }]);
    head.push(["meta", { property: "og:image:alt", content: pageTitle }]);
    head.push(["meta", { name: "twitter:image", content: `${hostname}/${imageUrl}` }]);
    head.push(["meta", { name: "twitter:image:width", content: "1200" }]);
    head.push(["meta", { name: "twitter:image:height", content: "628" }]);
    head.push(["meta", { name: "twitter:image:alt", content: pageTitle }]);
  }
  if (pageData.frontmatter.tag) {
    head.push(["meta", { property: "article:tag", content: pageData.frontmatter.tag }]);
  }
  if (pageData.frontmatter.date) {
    head.push([
      "meta",
      {
        property: "article:published_time",
        content: pageData.frontmatter.date,
      },
    ]);
  }
  if (pageData.lastUpdated && pageData.frontmatter.lastUpdated !== false) {
    head.push([
      "meta",
      {
        property: "article:modified_time",
        content: new Date(pageData.lastUpdated).toISOString(),
      },
    ]);
  }
  if (pageData.filePath === "manga/index.md") {
    head.push(["meta", { property: "al:android:url", content: "usagi://manga" }]);
    head.push(["meta", { property: "al:android:app_name", content: "Usagi" }]);
    head.push(["meta", { property: "al:android:package", content: "org.draken.usagi" }]);
  }

  return head;
}

export default generateMeta;
