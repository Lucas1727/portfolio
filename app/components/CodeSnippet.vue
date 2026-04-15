<template>
  <code class="px-2 font-(--font-mono) bg-(--gnome-bg) rounded-lg border border-(--gnome-border)">
    {{ code }}
  </code>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

</script>

<style scoped>

</style>