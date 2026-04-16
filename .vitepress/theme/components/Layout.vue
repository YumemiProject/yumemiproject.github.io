<script setup lang="ts">
import DefaultTheme from "vitepress/theme-without-fonts";

import BaseBreadcrumbs from "./BaseBreadcrumbs.vue";
import Home from "./Home.vue";
import NotFound from "./NotFound.vue";
import ScreenTranslatorWidget from "./ScreenTranslatorWidget.vue";
import TranslatorWidget from "./TranslatorWidget.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <Home />
    </template>
    <template #aside-outline-after>
      <TranslatorWidget />
    </template>
    <template #doc-before>
      <BaseBreadcrumbs />
    </template>
    <template #doc-footer-before>
      <ScreenTranslatorWidget />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
