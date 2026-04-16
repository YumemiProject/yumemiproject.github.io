<script setup lang="ts">
import { useData } from "vitepress";
// @ts-expect-error Missing types
import { createTranslate } from "vitepress/dist/client/theme-default/support/translation";
import { onMounted, ref, useId } from "vue";

import { ArrowLeft, MagnifyingGlass, X } from "../icons";

const id = useId();
const { theme } = useData();
const $t = createTranslate(theme.value.search?.options);

const { backButton = true } = defineProps<{
  placeholder: string;
  backButton?: boolean;
}>();

const model = defineModel({ type: String, required: false });

defineEmits<{ close: [] }>();

/* Search input focus */

const searchInput = ref<HTMLInputElement>();

function focusSearchInput() {
  searchInput.value?.focus();
  // searchInput.value?.select()
}

onMounted(() => {
  focusSearchInput();
});

function onSearchBarClick(event: PointerEvent) {
  if (event.pointerType === "mouse") {
    focusSearchInput();
  }
}
</script>

<template>
  <search>
    <form class="search-bar" @pointerup="onSearchBarClick($event)" @submit.prevent="">
      <label id="localsearch-label" :title="placeholder" :for="id"> <MagnifyingGlass width="18px" height="18px" />q </label>
      <div v-if="backButton" class="search-actions before">
        <button class="back-button" :title="$t('modal.backButtonTitle')" @click="$emit('close')">
          <ArrowLeft width="18" height="18" />
        </button>
      </div>
      <input :id ref="searchInput" v-model="model" :placeholder class="search-input" />
      <div class="search-actions">
        <button v-if="modelValue" class="clear-button" :title="$t('modal.resetButtonTitle')" @click="model = ''">
          <X width="24" height="24" />
        </button>
      </div>
    </form>
  </search>
</template>

<style scoped>
.search-bar {
  border: 1px solid var(--vp-c-gray-soft);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  height: 56px;
  cursor: text;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-1);
  padding: 0 8px;
}

.search-bar:focus-within {
  border-color: var(--vp-c-border);
}

.search-icon {
  margin: 8px;
  display: none;
}

.search-input {
  padding: 6px 4px;
  font-size: inherit;
  width: 100%;
}

.search-actions {
  display: flex;
  gap: 4px;
}

@media (any-pointer: coarse) {
  .search-actions {
    gap: 8px;
  }
}

@media (min-width: 768px) {
  .search-bar {
    padding: unset;
  }

  .search-icon {
    display: unset;
  }

  .search-input {
    padding: 6px 12px;
  }
}

@media (min-width: 769px) {
  .search-actions.before {
    display: none;
  }
}

.search-actions button {
  padding: 8px;
}

.search-actions button:hover {
  color: var(--vp-c-brand-1);
}
</style>
