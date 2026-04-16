<script setup lang="ts">
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { useData, withBase } from "vitepress";

import GPL from "../icons/GPL.vue";
import { socialList } from "../utils";
import Link from "./BaseLink.vue";

const { theme, frontmatter } = useData();
const qrcode = useQRCode(theme.value.footer?.qrcodeLink ?? "");
</script>

<template>
  <div v-if="frontmatter.footer !== false && theme.footer" class="site-container slide-enter">
    <footer class="site-footer">
      <div class="site-footer__content">
        <nav v-for="item in theme.footer.navigation" :key="item.title" class="site-footer__navigation">
          <h3 class="site-footer__title">{{ item.title }}</h3>
          <ul class="site-footer__list">
            <li v-for="ic in item.items" :key="ic.text" class="site-footer__item">
              <Link :href="ic.link ? withBase(ic.link) : '#'" :title="ic.text + '（' + (ic.link ? withBase(ic.link) : '') + '）'" no-icon>
                {{ ic.text }}
              </Link>
            </li>
          </ul>
        </nav>

        <div v-if="theme.footer.qrcodeLink" class="footer-qr-panel">
          <img :src="qrcode" alt="QR Code" class="footer-qr-panel__img" />
          <h4 class="footer-qr-panel__title">{{ theme.footer.qrcodeTitle }}</h4>
          <p class="footer-qr-panel__description">{{ theme.footer.qrcodeMessage }}</p>
        </div>
      </div>

      <div class="site-footer__social-links">
        <div class="site-footer__copy-info">
          <GPL height="24" />
          <p>GPL-3.0 Licensed<br />Yumemi Developers</p>
        </div>

        <ul>
          <li v-for="item in socialList" :key="item.link" class="site-footer__social-item">
            <a :href="item.link" :aria-label="item.title" :title="item.title" target="_blank" class="site-footer__social-link" rel="noopener noreferrer" v-html="item.icon"> </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.site-container {
  z-index: 1;
  position: relative;
  right: 0;
  bottom: 0;
  padding: 0 32px;
  background-color: var(--vp-c-bg-alt);

  .is-home ~ & .site-footer {
    max-width: 1152px;
  }
}

.site-footer {
  font-size: 0.87rem;
  line-height: 1.25rem;
  margin: 0 auto;

  &:first-child {
    padding-top: 2.5rem;
  }
}

.site-footer__social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  align-items: center;

  & > ul {
    display: flex;
    gap: 1rem;

    .site-footer__social-item {
      .site-footer__social-link {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color 0.25s;
        color: var(--vp-c-text-2);
        width: 2rem;
        height: 2rem;

        &:hover {
          color: var(--vp-c-text-1);
        }

        :deep(svg) {
          width: 1.5rem;
          height: 1.5rem;
          fill: currentColor;
        }
      }
    }
  }

  .site-footer__copy-info {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    svg {
      color: var(--vp-c-text-2);
    }
  }
}

.site-footer__navigation {
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  place-items: self-start;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow: hidden;

  &:first-child {
    border-top: 1px solid var(--vp-c-divider);
  }

  .site-footer__title {
    width: 100%;
    user-select: all;
    font-weight: 700;
    line-height: 1.33337;
    color: var(--vp-c-text-2);
    text-transform: uppercase;
    padding: 1rem 0;
    opacity: 0.8;

    &::after {
      content: "+";
      filter: invert(50%);
      float: right;
      width: 14px;
      height: 14px;
      text-align: center;
      margin-right: 8px;
      transition: transform 0.3s ease;
    }

    &:hover {
      &::after {
        transform: rotate(45deg) scale(1.08);
      }
    }

    &:hover ~ ul,
    ~ ul:hover {
      height: 100%;
    }
  }

  .site-footer__list {
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: 0.3s ease;

    .site-footer__item {
      &:last-child {
        margin-bottom: 16px;
      }

      a {
        display: inline-block;
        transition: color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
        color: var(--vp-c-text-1);
        padding: 6px 14px;
        width: 100%;

        &:hover {
          color: var(--vp-c-brand);
        }
      }
    }
  }
}

.footer-qr-panel {
  width: 192px;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: var(--vp-border-radius);
  background-color: var(--vp-c-bg-soft-up);
  border: 4px solid var(--vp-c-divider);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-self: end;
  gap: 0.5rem;
  line-height: 22px;
  color: var(--vp-c-text-2);

  .footer-qr-panel__img {
    box-shadow: var(--vp-shadow-1);
    border-radius: var(--vp-border-radius);
  }

  .footer-qr-panel__title {
    margin-top: 4px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: var(--vp-c-text-1);
  }

  .footer-qr-panel__description {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .site-footer {
    & > :last-child {
      border-top: 1px solid var(--vp-c-divider);
    }
  }

  .site-footer__social-links {
    flex-direction: row;
    align-items: unset;
    justify-content: space-between;
  }

  .site-footer__content {
    display: grid;
    place-items: start;
    grid-auto-flow: column;
    gap: 2rem;
    padding-bottom: 2.5rem;

    &:last-child {
      border-top: 1px solid var(--vp-c-divider);
    }

    .site-footer__navigation {
      place-items: self-start;
      border: none;
      border-top: none;

      .site-footer__title {
        &::after {
          display: none;
        }
      }

      .site-footer__list {
        height: 100%;

        & > .site-footer__item > a {
          padding: 0;
        }
      }
    }
  }

  .footer-qr-panel {
    display: flex;
  }
}

@media (min-width: 960px) {
  .VPSidebar ~ .site-container {
    width: calc(100% - var(--vp-sidebar-width));
    left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .site-footer {
    max-width: 945px;
  }
}
</style>
