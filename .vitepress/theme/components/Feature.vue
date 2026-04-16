<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";

import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import { computed } from "vue";

const props = defineProps<{
  image?: DefaultTheme.ThemeableImage;
  icon?: string;
  title: string;
  details?: string;
}>();

const ICONS: Record<string, string> = {
  sources:
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_402_1610)"> <path d="M17.6336 11.5653L12.2393 16.9596L15.3514 20.0717C16.841 21.5613 19.2561 21.5613 20.7457 20.0717C22.2353 18.5821 22.2353 16.167 20.7457 14.6774L17.6336 11.5653Z" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M6.80931 11.2036L12.2036 5.80925L9.09151 2.69715C7.60192 1.20755 5.18681 1.20756 3.69721 2.69715C2.20762 4.18675 2.20762 6.60186 3.69721 8.09146L6.80931 11.2036Z" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M13.1909 15.4215L11.2393 13.4699" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M16.0955 12.5169L14.1439 10.5653" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M20.7456 20.0717L21.9904 21.3165" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M3.69714 2.69713L2.4523 1.45229" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M11.4094 17.7895L18.4635 10.7354" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> <path d="M13.0334 4.97935L5.97936 12.0334" stroke="currentColor" stroke-width="1.55182" stroke-linecap="round"></path> </g> <defs> <clipPath id="clip0_402_1610"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>',
  interface:
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 18.5001V14.6001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 7.45V5.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 18.5V16.55" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 9.4V5.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
  new:
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
};

const iconSvg = computed(() => (props.icon ? ICONS[props.icon] : undefined));
</script>

<template>
  <div class="Feature">
    <div class="box">
      <div class="content">
        <h1 v-if="title" class="title">
          <span class="clip" v-html="title"></span>
        </h1>
        <div v-if="details" class="details">
          <p v-html="details"></p>
        </div>
      </div>
      <div v-if="iconSvg" class="icon" v-html="iconSvg"></div>
      <div v-else-if="image" class="image">
        <VPImage class="image-src" :image />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Feature {
  display: block;
  border: 2px solid color-mix(in srgb, #f5b3bf 55%, transparent);
  border-radius: var(--vp-border-radius);
  height: 100%;
  background: color-mix(in srgb, var(--vp-c-bg) 90%, #f5b3bf 10%);
  box-shadow: 0 8px 24px color-mix(in srgb, #f5b3bf 24%, transparent);
  transition:
    border-color 0.25s,
    background-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;
}

.Feature:hover {
  border-color: color-mix(in srgb, #f5b3bf 80%, transparent);
  box-shadow: 0 12px 30px color-mix(in srgb, #f5b3bf 34%, transparent);
  transform: translateY(-2px);
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  height: 100%;
}

.content {
  flex: 1;
  min-width: 0;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.details:deep(a) {
  color: var(--vp-c-brand-1);
}

.details:deep(a:hover) {
  text-decoration: underline;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  color: #c97187;
  background: color-mix(in srgb, #f5b3bf 30%, transparent);
}

.icon :deep(svg) {
  width: 28px;
  height: 28px;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.image {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
}

.image :deep(img) {
  max-width: 56px;
  max-height: 56px;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}

:global(html.dark) .Feature {
  border-color: color-mix(in srgb, #f7c2cc 50%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg) 88%, #f7c2cc 12%);
  box-shadow: 0 8px 24px color-mix(in srgb, #f7c2cc 20%, transparent);
}

:global(html.dark) .Feature:hover {
  border-color: color-mix(in srgb, #f7c2cc 78%, transparent);
  box-shadow: 0 12px 30px color-mix(in srgb, #f7c2cc 30%, transparent);
}

:global(html.dark) .icon {
  color: #ffffff;
  background: color-mix(in srgb, #f7c2cc 22%, transparent);
}
</style>
