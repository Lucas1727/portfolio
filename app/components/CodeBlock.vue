<template>
  <div class="rounded-xl border border-(--gnome-border) overflow-hidden">
    <div class="flex justify-between items-center p-2 border-b border-(--gnome-border) bg-(--gnome-panel)">
      <p class="font-(--font-mono) pl-2">{{ lang }}</p>
      <UButton variant="ghost" class="text-(--gnome-text) border border-(--gnome-border) bg-transparent hover:bg-(--gnome-panel-2)"
               :class="{ 'code-block__copy-btn--copied': copied }"
               :aria-label="copied ? 'Copied!' : 'Copy code'"
               @click="copyCode">
        <UIcon :name="copied ? 'i-mdi-check' : 'i-mdi-content-copy'"/>
        <p>{{ copied ? 'Copied!' : 'Copy' }}</p>
      </UButton>
    </div>

    <code class="flex flex-col gap-2 p-4 font-(--font-mono) bg-(--gnome-bg)">{{ code }}</code>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  lang?: string
}>()

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped></style>
