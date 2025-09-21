<template>
  <div :id="app" class="window">
    <div :id="`${app}-navbar`" class="window-navbar">
      <v-spacer></v-spacer>
      <div @click="toggleWindow(app)" class="nav-btn" style="background-color: #5ac846;"></div>
      <div @click="sizeWindow(app)" class="nav-btn" style="background-color: #f0c828"></div>
      <div @click="closeWindow(app)" class="nav-btn" style="background-color: #f0645a"></div>
    </div>

    <div :id="`${app}-body`" class="window-body">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {closeWindow, sizeWindow, toggleWindow} from "assets/ts/desktop";

defineProps<{
  app: string
}>()

</script>

<style scoped>

</style>