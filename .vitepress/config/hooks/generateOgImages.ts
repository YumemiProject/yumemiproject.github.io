import type { ContentData, SiteConfig } from "vitepress";
import { renderAsync } from "@resvg/resvg-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createContentLoader } from "vitepress";
import satori from "satori";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __fonts = resolve(__dirname, "../../fonts");

/**
 * Processes HTML by stripping most tags but preserving line breaks (<br>).
 * Returns an array of children compatible with Satori VNodes.
 */
function processHtml(html: string): any {
  if (!html) return "";
  
  // Replace <br> tags with a marker
  let text = html.replace(/<br\s*\/?>/gi, "BR_MARKER");
  
  // Strip all other HTML tags
  text = text.replace(/<[^>]*>/g, "");
  
  // Convert entities if any (minimal support)
  text = text.replace(/&nbsp;/g, " ")
             .replace(/&amp;/g, "&")
             .replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/&quot;/g, '"');

  // Split by marker and return array of text and br nodes
  const parts = text.split("BR_MARKER");
  if (parts.length === 1) return parts[0].trim();

  const children: any[] = [];
  parts.forEach((part, i) => {
    children.push(part.trim());
    if (i < parts.length - 1) {
      children.push({ type: "br", props: {} });
    }
  });
  
  return children;
}

async function generateOgImages(config: SiteConfig) {
  const pages = await createContentLoader("/**/*.md", { excerpt: true }).load();
  const logoPath = resolve(__dirname, "../../../website/public/logo-compact.png");
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  const iconPath = resolve(__dirname, "../../../website/public/icon-192.png");
  const iconData = await readFile(iconPath);
  const iconBase64 = `data:image/png;base64,${iconData.toString("base64")}`;

  const fonts = [
    {
      name: "Montserrat",
      data: await readFile(resolve(__fonts, "Montserrat-Regular.ttf")),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Montserrat",
      data: await readFile(resolve(__fonts, "Montserrat-Bold.ttf")),
      weight: 700 as const,
      style: "normal" as const,
    },
  ];

  const filteredPages = pages.filter((p) => p.frontmatter.image === undefined);

  console.log(`Generating OG images for ${filteredPages.length} pages...`);
  for (const page of filteredPages) {
    console.log(`Generating image for ${page.url}...`);
    await generateImage({
      page,
      outDir: config.outDir,
      fonts,
      logo: logoBase64,
      icon: iconBase64,
    });
  }
  console.log("Finished generating OG images.");
}

export default generateOgImages;

interface GenerateImagesOptions {
  page: ContentData;
  outDir: string;
  fonts: any[];
  logo: string;
  icon: string;
}

async function generateImage({ page, outDir, fonts, logo, icon }: GenerateImagesOptions) {
  const { frontmatter, url } = page;

  const rawTitle = (frontmatter.layout === "home" ? (frontmatter.main?.name ?? frontmatter.title) : (frontmatter.customMetaTitle ?? frontmatter.title)) || "Usagi";
  const rawDescription = (frontmatter.layout === "home" ? (frontmatter.main?.tagline ?? frontmatter.description) : frontmatter.description) || "";

  // Process HTML to handle <br> specifically
  const titleChildren = processHtml(rawTitle);
  const descriptionChildren = processHtml(rawDescription);

  // Direct Satori VNode structure
  const vnode = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "628px",
        backgroundColor: "#a94f68",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        fontFamily: "Montserrat",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              padding: "56px",
              width: "800px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "40px",
                    fontWeight: 700,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", alignItems: "center" },
                        children: [
                          {
                            type: "img",
                            props: {
                              src: icon,
                              style: { width: "48px", height: "48px", marginRight: "16px" },
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: { color: "white", fontWeight: "bold", fontSize: "40px", display: "flex" },
                              children: "Usagi",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { fontSize: "72px", fontWeight: 700, color: "white", display: "flex", flexDirection: "column" },
                  children: titleChildren,
                },
              },
              {
                type: "div",
                props: {
                  style: { width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end" },
                  children: descriptionChildren ? [
                    {
                      type: "div",
                      props: {
                        style: { marginTop: "32px", fontSize: "32px", color: "white", display: "flex", flexDirection: "column" },
                        children: descriptionChildren,
                      },
                    },
                  ] : null,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { width: "400px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" },
            children: [
              {
                type: "img",
                props: {
                  src: logo,
                  style: { width: "350px", height: "350px", objectFit: "contain" },
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(vnode as any, {
    width: 1200,
    height: 628,
    fonts,
  });

  const render = await renderAsync(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const outputFolder = resolve(outDir, url.substring(1), "__og_image__");
  const outputFile = resolve(outputFolder, "og.png");

  await mkdir(outputFolder, { recursive: true });

  return await writeFile(outputFile, render.asPng());
}
