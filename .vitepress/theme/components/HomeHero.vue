<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";

import Typed from "typed.js";
import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import { inject, onMounted, onUnmounted, type Ref, ref } from "vue";

import BaseButton from "./BaseButton.vue";

interface HeroAction {
  theme?: "alt" | "brand";
  text: string;
  link: string;
}

interface Data {
  image?: DefaultTheme.ThemeableImage;
  title: string;
  text: string;
  tagline: string;
  actions: HeroAction[];
}

const props = defineProps<{
  data: Data;
}>();

const heroImageSlotExists = inject("hero-image-slot-exists") as Ref<boolean>;

const typedElement = ref<HTMLElement | null>(null);
let typedInstance: null | Typed = null;

onMounted(() => {
  if (typedElement.value && props.data.text) {
    const textWithPauses = props.data.text.replace(". ", ".^1000 ");
    typedInstance = new Typed(typedElement.value, {
      strings: [textWithPauses],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: false,
      showCursor: true,
      cursorChar: "|",
      contentType: "html",
      startDelay: 1000,
    });
  }
});

onUnmounted(() => {
  typedInstance?.destroy();
});
</script>

<template>
  <div class="VPHomeHero" :class="{ 'has-image': data.image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info">
          <h1 v-if="data.title" class="title" data-aos="fade-up" data-aos-delay="100" data-aos-offset="0">
            <span class="clip" v-html="data.title"></span>
          </h1>
          <h2 v-if="data.text" class="text" data-aos="fade-up" data-aos-delay="200" data-aos-offset="0">
            <span class="typed-container">
              <span class="placeholder">{{ data.text }}</span>
              <span class="typed-overlay">
                <span ref="typedElement" class="clip"></span>
              </span>
            </span>
          </h2>
          <p v-if="data.tagline" class="description" data-aos="fade-up" data-aos-delay="300" data-aos-offset="0" v-html="data.tagline"></p>
        </slot>
        <div v-if="data.actions" class="actions" data-aos="fade-up" data-aos-delay="400" data-aos-offset="0">
          <p v-for="action in data.actions" :key="action.link" :class="['action', { 'action--download': action.link === '/download/' }]">
            <BaseButton tag="a" :theme="action.theme" :text="action.text" :href="action.link" />
          </p>
        </div>
      </div>
      <div v-if="data.image || heroImageSlotExists" class="image" data-aos="fade-up" data-aos-delay="500" data-aos-offset="0">
        <div class="image-container">
          <slot name="image">
            <VPImage class="image-src" :image="data.image" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.typed-cursor) {
  color: var(--vp-c-brand-1);
  font-weight: 400;
}

.VPHomeHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 16px) 24px 32px;
}

@media (min-width: 640px) {
  .VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 24px) 48px 40px;
  }
}

@media (min-width: 960px) {
  .VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 24px) 64px 40px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
    align-items: center;
    gap: clamp(32px, 5vw, 88px);
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

.VPHomeHero.has-image .container {
  text-align: center;
}

@media (min-width: 960px) {
  .VPHomeHero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .VPHomeHero.has-image .main {
    max-width: 592px;
  }
}

.title {
  font-size: 48px;
  letter-spacing: -0.4px;
  line-height: 50px;
  font-weight: 800;
  max-width: 392px;
  color: var(--vp-c-brand-1);
  white-space: pre-wrap;
}

.VPHomeHero.has-image .title {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .title {
    max-width: 576px;
    line-height: 56px;
    font-size: 64px;
  }
}

@media (min-width: 960px) {
  .title {
    line-height: 64px;
    font-size: 72px;
  }

  .VPHomeHero.has-image .title {
    margin: 0.25rem 0 1rem;
  }
}

.text {
  font-size: 36px;
  letter-spacing: -0.4px;
  line-height: 50px;
  font-weight: 700;
  max-width: 392px;
}

.typed-container {
  position: relative;
  display: inline-block;
}

.placeholder {
  visibility: hidden;
  white-space: pre-wrap;
}

.typed-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  white-space: pre-wrap;
}

.VPHomeHero.has-image .text {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 36px;
  }
}

@media (min-width: 960px) {
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHomeHero.has-image .text {
    margin: 1.5rem 0;
  }
}

.description {
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHomeHero.has-image .description {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .description {
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .description {
    line-height: 36px;
    font-size: 24px;
    max-width: 576px;
  }

  .VPHomeHero.has-image .description {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  margin: -6px;
}

.VPHomeHero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 960px) {
  .VPHomeHero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.action :deep(.Button) {
  border-radius: 25px;
  padding: 10px 22px;
  transition:
    transform 0.2s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.action :deep(.Button:hover) {
  transform: translateY(-1px);
}

.action--download :deep(.Button.brand) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: transparent;
}

.action--download :deep(.Button.brand:hover) {
  border-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.action--download :deep(.Button.brand:active) {
  border-color: var(--vp-button-brand-active-bg);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: transparent;
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand:hover) {
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
  background-color: var(--vp-c-brand-1);
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand:active) {
  border-color: var(--vp-c-brand-2);
  color: #ffffff;
  background-color: var(--vp-c-brand-2);
}

.action :deep(.Button.brand:hover) {
  box-shadow:
    0 0 0 3px rgba(51, 70, 113, 0.24),
    0 0 20px rgba(51, 70, 113, 0.44),
    0 10px 24px rgba(51, 70, 113, 0.3);
}

.action :deep(.Button.alt:hover) {
  box-shadow:
    0 0 0 3px #f7f7f79E,
    0 0 20px #575e713D,
    0 10px 24px #575e712E;
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand:hover) {
  box-shadow:
    0 0 0 3px rgba(51, 70, 113, 0.24),
    0 0 20px rgba(51, 70, 113, 0.44),
    0 10px 24px rgba(51, 70, 113, 0.3);
}

@supports (color: color-mix(in srgb, white, black)) {
  .action :deep(.Button.brand:hover) {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 24%, transparent),
      0 0 20px color-mix(in srgb, var(--vp-c-brand-1) 44%, transparent),
      0 10px 24px color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  }

  .action :deep(.Button.alt:hover) {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--vp-c-gray-1) 62%, transparent),
      0 0 20px color-mix(in srgb, var(--vp-c-accent-1) 24%, transparent),
      0 10px 24px color-mix(in srgb, var(--vp-c-accent-1) 18%, transparent);
  }

  :global(html:not(.dark) .VPHomeHero .action--download .Button.brand:hover) {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 24%, transparent),
      0 0 20px color-mix(in srgb, var(--vp-c-brand-1) 44%, transparent),
      0 10px 24px color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  }
}

.image {
  order: 1;
  margin: 0 auto 24px;
  width: 100%;
}

@media (max-width: 959px) {
  .image[data-aos] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

@media (min-width: 640px) {
  .image {
    margin: 0 auto 32px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
    padding-left: clamp(16px, 3vw, 48px);
    width: auto;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 335px;
  max-width: 100%;
  height: 410px;
}

@media (min-width: 640px) {
  .image-container {
    width: 392px;
    max-width: 100%;
    height: 460px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: min(580px, 65vh);
    max-width: none;
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  max-height: min(395px, 49vh);
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.22));
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-height: min(440px, 50vh);
    top: 50%;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: min(360px, 28vw);
    max-height: min(600px, 68vh);
    top: calc(50% + clamp(12px, 2.8vh, 28px));
    left: calc(50% + clamp(0px, 1.2vw, 16px));
  }
}
</style>
