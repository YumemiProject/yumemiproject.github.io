import { inBrowser, type Router, useData } from "vitepress";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DefaultTheme from "vitepress/theme-without-fonts";
import { type App, watchEffect } from "vue";

import Layout from "./components/Layout.vue";
import { createZoom } from "./composables/useZoom";
import initializeAnalytics from "./plugins/analytics";
import "./styles/global.css";
import "./styles/glightbox.css";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: Layout,
  setup() {
    const { lang } = useData();
    watchEffect(() => {
      if (inBrowser) {
        document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`;
      }
    });
  },
  enhanceApp({ app, router }: { app: App; router: Router }) {
    enhanceAppWithTabs(app);
    createZoom(app, router);
    initializeAnalytics("G-X37JGMJE4R");
  },
};
