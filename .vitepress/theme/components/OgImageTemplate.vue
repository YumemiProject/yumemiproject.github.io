<script setup lang="ts">
defineProps<{ title: string; description?: string; dir?: string; logo: string }>();
</script>

<template>
  <div style="width: 1200px; height: 628px; background-color: #a94f68; display: flex; flex-direction: row; align-items: stretch;">
    <div style="padding: 56px; width: 800px; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; font-size: 40px; font-weight: 500;">
        <div style="display: flex; align-items: center;">
          <div style="color: white; font-weight: bold; font-size: 40px; display: flex;">Usagi</div>
        </div>
      </div>
      <div style="font-size: 72px; font-weight: bold; color: white; display: flex;">{{ title }}</div>
      <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end;">
        <div v-if="description" style="margin-top: 32px; font-size: 32px; color: white; display: flex;">{{ description }}</div>
      </div>
    </div>
    <div style="width: 400px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px;">
      <img :src="logo" style="width: 350px; height: 350px; object-fit: contain" />
    </div>
  </div>
</template>
