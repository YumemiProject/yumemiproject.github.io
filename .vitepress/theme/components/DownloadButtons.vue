<script setup lang="ts">
/// <reference types="@types/gtag.js" />

import { computed } from "vue";

import { data as release } from "../data/release.data";

const downloadInformation = computed(() => ({
  stable: {
    tagName: release.stable.tag_name ?? "v0.0.0",
    asset: (release.stable.assets ?? []).find((a) => a.name.endsWith("release.apk")),
  },
  beta: release.beta ? {
    tagName: release.beta.tag_name ?? "v0.0.0",
    asset: (release.beta.assets ?? []).find((a) => a.name.endsWith("release.apk")),
  } : undefined,
}));

function handleAnalytics(type: "Stable" | "Beta") {
  const version = type === "Stable" ? release.stable.tag_name : release.beta?.tag_name;
  window.gtag?.("event", "Download", {
    event_category: "App",
    event_label: type,
    version: version,
  });
}
</script>

<template>
  <div>
    <div class="download-buttons">
      <a class="download-button primary" :download="downloadInformation.stable.asset?.name" :href="downloadInformation.stable.asset?.browser_download_url" @click="handleAnalytics('Stable')">
        <span class="text">Stable</span>
        <span class="version">{{ downloadInformation.stable.tagName }}</span>
      </a>
      <a v-if="downloadInformation.beta" class="download-button alt" :download="downloadInformation.beta.asset?.name" :href="downloadInformation.beta.asset?.browser_download_url" @click="handleAnalytics('Beta')">
        <span class="text">Beta</span>
        <span class="version">{{ downloadInformation.beta.tagName }}</span>
      </a>
    </div>
    <span class="version-disclaimer"> Requires <strong>Android 5.0</strong> or higher. </span>
  </div>
</template>

<style scoped>
.download-buttons {
  display: flex;
  gap: 0.75em;
  justify-content: center;
  align-items: center;
  margin: 0.75em auto;
}

.download-button {
  position: relative;
  display: inline-block;
  border: 4px solid transparent;
  border-radius: 8px;
  justify-content: center;
  padding: 8px 18px;
  font-size: 16px;
  font-weight: 500;
  transition:
    all 0.25s,
    color 0.25s;
  text-decoration: none !important;
}

.download-button.primary {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-2);
}

.download-button.primary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.download-button.primary:active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.download-button.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.download-button.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.download-button.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

svg {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
  font-size: 1.25em;
}

.text {
  margin-right: 10px;
  font-weight: bold;
}

.version {
  font-size: 1em;
}

.version-disclaimer {
  display: block;
  text-align: center;
  margin: 0.75em auto;
  font-size: 0.75rem;
}
</style>
