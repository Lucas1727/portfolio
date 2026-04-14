<template>
  <div class="fixed z-10" style="inset:36px 0 0 0;pointer-events:none;">
    <TransitionGroup name="window">
      <Window v-for="win in visibleWindows" :key="win.id" :window="win" style="pointer-events:auto;"/>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Window from "~/components/desktop/Window.vue";

const {windows} = windowManager()
const visibleWindows = computed(() => (windows as any).value.filter((w: any) => !w.isMinimized))
</script>
