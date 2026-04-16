// @ts-expect-error Missing types
import shortcode_plugin from "markdown-it-shortcode-tag";
import { fileURLToPath, URL } from "node:url";
import { slugify } from "transliteration";
import { defineConfigWithTheme } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

import type { ThemeConfig } from "../theme/types";

import { telegram } from "../../website/icons";
import { addPlugins } from "../theme/plugins/markdown";
import { prepareData, sections } from "../theme/plugins/section";
import { config as root, searchLocale as searchLocaleEn } from "./en";
import generateMeta from "./hooks/generateMeta";
import generateOgImages from "./hooks/generateOgImages";
import shortcodes from "./shortcodes";

const SITE_HOST = "https://yumemi.moe";
const SITE_TITLE = "yumemi.moe";
const SITE_TITLE_SEPARATOR = " / ";
const SITE_BASE = "/usagi/";
const SITE_URL = new URL(SITE_BASE, SITE_HOST).toString().replace(/\/$/, "");

function mapSitemapUrlToBase(url: string): string {
  const siteOrigin = new URL(SITE_HOST).origin;
  const sitemapBase = SITE_BASE.endsWith("/") ? SITE_BASE : `${SITE_BASE}/`;
  const sitemapBaseNoSlash = sitemapBase.slice(0, -1);

  const parsed = new URL(url, SITE_HOST);
  if (parsed.origin !== siteOrigin) {
    return url;
  }

  if (parsed.pathname === sitemapBaseNoSlash || parsed.pathname.startsWith(sitemapBase)) {
    return parsed.toString();
  }

  const normalizedPath = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
  parsed.pathname = `${sitemapBase}${normalizedPath}`.replace(/\/{2,}/g, "/");
  return parsed.toString();
}
const LEGACY_PATH_REDIRECT_SCRIPT = `
(() => {
  if (typeof window === "undefined") return;

  const base = ${JSON.stringify(SITE_BASE)};
  const basePath = base.endsWith("/") ? base.slice(0, -1) : base;
  const { pathname, search, hash } = window.location;

  if (pathname === basePath && !pathname.endsWith("/")) {
    window.location.replace(base + search + hash);
    return;
  }

  if (pathname.startsWith(basePath + "/")) {
    return;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : "/" + pathname;
  window.location.replace(basePath + normalizedPath + search + hash);
})();
`;

export default defineConfigWithTheme<ThemeConfig>({
  lastUpdated: true,
  cleanUrls: true,
  base: SITE_BASE,

  title: SITE_TITLE,
  titleTemplate: ":title" + SITE_TITLE_SEPARATOR + SITE_TITLE,
  srcDir: "./website",

  markdown: {
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },

    anchor: {
      slugify(str) {
        str = str
          .trim()
          .replace(/^\d*/g, "") // Удаление чисел из начала строки
          .replace(/[^a-zA-Zа-яА-ЯЁё0-9\-\s]/g, "") // Удаление ненужных символов
          .replace(/\s-\s/, "-")
          .replace(/-+/g, "-") // Избавление от повторяющихся символов
          .replace(/^(.{25}[^\s]*).*/, "$1"); // Ограничение количества символов

        return encodeURIComponent(slugify(str, { lowercase: true }));
      },
    },

    config(md) {
      addPlugins(md);
      md.use(tabsMarkdownPlugin);
      md.use(shortcode_plugin, shortcodes);
    },
  },

  themeConfig: {
    titleSeparator: SITE_TITLE_SEPARATOR,
    i18nRouting: true,

    logo: {
      light: "/logo.svg",
      dark: "/logo.svg",
    },

    socialLinks: [
      { icon: { svg: telegram }, link: "https://t.me/UsagiApp" },
      { icon: "discord", link: "https://discord.gg/4AHskjwtj4" },
      { icon: "github", link: "https://github.com/UsagiApp/Usagi" },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          ...searchLocaleEn,
        },
      },
    },

    sections,
  },

  locales: {
    ...root,
  },

  transformPageData(pageData, { siteConfig }) {
    return prepareData(pageData, siteConfig);
  },

  head: [
    ["script", {}, LEGACY_PATH_REDIRECT_SCRIPT],
    // Fonts
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" }],
    // Icons and webmanifest
    ["link", { rel: "icon", href: `${SITE_BASE}favicon.ico?v=2`, sizes: "any" }],
    ["link", { rel: "icon", href: `${SITE_BASE}logo-compact.svg?v=2`, type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: `${SITE_BASE}apple-touch-icon.png?v=2` }],
    ["link", { rel: "manifest", href: `${SITE_BASE}site.webmanifest` }],
  ],
  transformHead: async (context) => generateMeta(context, SITE_URL),

  vite: {
    plugins: [
      {
        name: "legacy-base-path-redirect",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url;
            if (!url) {
              next();
              return;
            }

            if (url.startsWith(SITE_BASE) || url.startsWith("/@") || url.startsWith("/__vite")) {
              next();
              return;
            }

            const target = url.startsWith("/") ? `${SITE_BASE.slice(0, -1)}${url}` : `${SITE_BASE}${url}`;
            res.statusCode = 307;
            res.setHeader("Location", target);
            res.end();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url;
            if (!url) {
              next();
              return;
            }

            if (url.startsWith(SITE_BASE)) {
              next();
              return;
            }

            const target = url.startsWith("/") ? `${SITE_BASE.slice(0, -1)}${url}` : `${SITE_BASE}${url}`;
            res.statusCode = 307;
            res.setHeader("Location", target);
            res.end();
          });
        },
      },
    ],
    resolve: {
      alias: ["VPSidebar", "VPNavBarTranslations", "VPNavScreenTranslations", "VPNavBar", "VPNavBarMenu", "VPNavScreenMenu", "VPFooter"].map((componentName) => ({
        find: new RegExp(`^.*/${componentName}.vue$`),
        replacement: fileURLToPath(new URL(`../theme/components/${componentName.replace(/^VP/, "")}.vue`, import.meta.url)),
      })),
    },
  },

  sitemap: {
    hostname: SITE_HOST,
    transformItems: async (items) => items.map((item) => ({ ...item, url: mapSitemapUrlToBase(item.url) })),
  },

  buildEnd: async (context) => {
    generateOgImages(context);
  },
});
