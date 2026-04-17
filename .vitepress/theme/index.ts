import { inBrowser, type Router, useData } from "vitepress";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DefaultTheme from "vitepress/theme-without-fonts";
import { type App, watchEffect } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";

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

    if (inBrowser) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      });
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      (window as any).lenis = lenis;
      const originalScrollTo = window.scrollTo;
      window.scrollTo = function (...args: any[]) {
        const options = args[0];
        if (options && typeof options === "object" && options.top === 0 && options.behavior === "smooth") {
          lenis.scrollTo(0, { duration: 1.5 });
        } else {
          originalScrollTo.apply(window, args as any);
        }
      };
    }
  },
  enhanceApp({ app, router }: { app: App; router: Router }) {
    enhanceAppWithTabs(app);
    createZoom(app, router);
    initializeAnalytics("G-X37JGMJE4R");

    if (inBrowser) {
      document.documentElement.classList.add("cross-switching");
      setTimeout(() => {
        document.documentElement.classList.remove("cross-switching");
      }, 50);

      router.onBeforeRouteChange = async (to) => {
        const from = window.location.pathname;
        const toPath = typeof to === "string" ? to : (to as any).path || "";
        const isToHome = toPath === "/" || toPath === "/index.html";
        const isFromHome = from === "/" || from === "/index.html";
        const isDocsToDocs = !isFromHome && !isToHome;

        if (isDocsToDocs) {
          document.documentElement.classList.add("manual-switching");
          await new Promise((resolve) => setTimeout(resolve, 300));
        } else if (isToHome || isFromHome) {
          document.documentElement.classList.add("cross-switching");
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      };

      router.onAfterRouteChanged = () => {
        setTimeout(() => {
          document.documentElement.classList.remove("cross-switching");
          document.documentElement.classList.remove("manual-switching");

          requestAnimationFrame(() => {
            AOS.refreshHard();
            AOS.refresh();
          });
        }, 50);
      };

      watchEffect(() => {
        const path = router.route.path;
        if (inBrowser) {
          setTimeout(() => {
            const docContainer = document.querySelector(".VPDoc");
            const isHomePage = path === "/" || path === "/index.html";

            if (docContainer && !isHomePage) {
              docContainer.setAttribute("data-aos", "fade-up");
              docContainer.setAttribute("data-aos-once", "false");
              docContainer.setAttribute("data-aos-delay", "100");
              docContainer.setAttribute("data-aos-duration", "500");
              AOS.refresh();
            }
          }, 0);
        }
      });
    }
  },
};
