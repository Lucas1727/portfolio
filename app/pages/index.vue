<template>
  <TopBar/>
  <WindowLayer/>
  <Icons/>
  <Dock/>
  <Background/>
</template>

<script setup lang="ts">
import TopBar from "~/components/desktop/TopBar.vue";
import Background from "~/components/desktop/Background.vue";
import Icons from "~/components/desktop/Icons.vue";
import WindowLayer from "~/components/desktop/WindowLayer.vue";
import Dock from "~/components/desktop/Dock.vue";
import {useToast} from "@nuxt/ui/composables/useToast";

const toast = useToast()

const timeout = 5000;

onMounted(() => {
  toast.add({
    title: 'Welcome!',
    description: 'Double-click icons to open apps. Try the Terminal!',
    icon: 'i-heroicons-hand-raised',
    color: 'neutral',
    duration: 0
  })
})
</script>
