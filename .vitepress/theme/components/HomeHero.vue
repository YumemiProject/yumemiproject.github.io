<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";

import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import { inject, type Ref } from "vue";

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

defineProps<{
  data: Data;
}>();

const heroImageSlotExists = inject("hero-image-slot-exists") as Ref<boolean>;
</script>

<template>
  <div class="VPHomeHero" :class="{ 'has-image': data.image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info">
          <h1 v-if="data.title" class="title">
            <span class="clip" v-html="data.title"></span>
          </h1>
          <h2 v-if="data.text" class="text">
            <span class="clip" v-html="data.text"></span>
          </h2>
          <p v-if="data.tagline" class="description" v-html="data.tagline"></p>
        </slot>
        <div v-if="data.actions" class="actions">
          <p v-for="action in data.actions" :key="action.link" :class="['action', { 'action--download': action.link === '/download/' }]">
            <BaseButton tag="a" :theme="action.theme" :text="action.text" :href="action.link" />
          </p>
        </div>
      </div>
      <div v-if="data.image || heroImageSlotExists" class="image">
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
.VPHomeHero {
  margin-top: calc((var(--vp-nav-height) + var(--var-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
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

:global(html:not(.dark) .VPHomeHero .title) {
  color: #f8c3cb;
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
    margin: 1.5rem 0;
  }
}

.text {
  font-size: 36px;
  letter-spacing: -0.4px;
  line-height: 50px;
  font-weight: 700;
  max-width: 392px;
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
  border-color: #f5b3bf;
  color: #d78799;
  background-color: transparent;
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand:hover) {
  border-color: #f5b3bf;
  color: #4f2f3a;
  background-color: #f5b3bf;
}

:global(html:not(.dark) .VPHomeHero .action--download .Button.brand:active) {
  border-color: #e8a1af;
  color: #4f2f3a;
  background-color: #e8a1af;
}

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
    0 0 0 3px color-mix(in srgb, #f5b3bf 36%, transparent),
    0 0 20px color-mix(in srgb, #f5b3bf 52%, transparent),
    0 10px 24px color-mix(in srgb, #f5b3bf 38%, transparent);
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 320px;
  height: 320px;
}

@media (min-width: 640px) {
  .image-container {
    width: 392px;
    height: 392px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
  max-width: 192px;
  max-height: 192px;
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
