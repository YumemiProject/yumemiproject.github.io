<script setup lang="ts">
/// <reference types="@types/gtag.js" />

import { computed } from "vue";

import { data as release } from "../data/release.data";

const downloadInformation = computed(() => ({
  stable: {
    tagName: release.stable.tag_name ?? "v0.0.0",
    asset: (release.stable.assets ?? []).find((a) => a.name.endsWith("release.apk")),
  },
}));

function handleAnalytics() {
  window.gtag?.("event", "Download", {
    event_category: "App",
    event_label: "Stable",
    version: release.stable.tag_name,
  });
}
</script>

<template>
  <div>
    <div class="download-buttons">
      <a class="download-button primary" :download="downloadInformation.stable.asset?.name" :href="downloadInformation.stable.asset?.browser_download_url" @click="handleAnalytics()">
        <span class="text">Stable</span>
        <span class="version">{{ downloadInformation.stable.tagName }}</span>
      </a>
    </div>
    <span class="version-disclaimer"> Requires <strong>Android 6.0</strong> or higher. </span>
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
