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
import { config as root, getFooter, searchLocale as searchLocaleEn } from "./en";
import { resolveBaseUrl } from "../theme/utils";
import generateMeta from "./hooks/generateMeta";
import generateOgImages from "./hooks/generateOgImages";
import shortcodes from "./shortcodes";

const SITE_HOST = "https://yumemi.moe";
const SITE_TITLE = "yumemi.moe";
const SITE_TITLE_SEPARATOR = " / ";
const SITE_BASE = "/";
const SITE_URL = "https://yumemi.moe";

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

    footer: resolveBaseUrl(getFooter(), ""),
    sections,
  },

  locales: {
    ...root,
  },

  transformPageData(pageData, { siteConfig }) {
    return prepareData(pageData, siteConfig);
  },

  head: [
    // Fonts
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" }],
    // Icons and webmanifest
    ["link", { rel: "icon", href: "/favicon.ico?v=2", sizes: "any" }],
    ["link", { rel: "icon", href: "/logo-compact.svg?v=2", type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
  ],
  transformHead: async (context) => generateMeta(context, SITE_URL),

  vite: {
    plugins: [],
    resolve: {
      alias: [
        { find: /^.*\/VPFooter\.vue$/, replacement: fileURLToPath(new URL("../theme/components/Footer.vue", import.meta.url)) },
        { find: /^.*\/VPSidebar\.vue$/, replacement: fileURLToPath(new URL("../theme/components/Sidebar.vue", import.meta.url)) },
        { find: /^.*\/VPNavBar\.vue$/, replacement: fileURLToPath(new URL("../theme/components/NavBar.vue", import.meta.url)) },
        { find: /^.*\/VPNavBarMenu\.vue$/, replacement: fileURLToPath(new URL("../theme/components/NavBarMenu.vue", import.meta.url)) },
        { find: /^.*\/VPNavScreenMenu\.vue$/, replacement: fileURLToPath(new URL("../theme/components/NavScreenMenu.vue", import.meta.url)) },
        { find: /^.*\/VPNavBarTranslations\.vue$/, replacement: fileURLToPath(new URL("../theme/components/NavBarTranslations.vue", import.meta.url)) },
        { find: /^.*\/VPNavScreenTranslations\.vue$/, replacement: fileURLToPath(new URL("../theme/components/NavScreenTranslations.vue", import.meta.url)) },
      ],
    },
  },

  sitemap: {
    hostname: SITE_HOST,
    transformItems: async (items) => items.map((item) => ({ ...item, url: mapSitemapUrlToBase(item.url) })),
  },

  buildEnd: async (context) => {
    await generateOgImages(context);
  },
});
