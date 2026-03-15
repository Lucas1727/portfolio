<template>
  <UApp class="desktop-root" :theme="{ dark: true }">
    <NuxtPage/>
  </UApp>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
  title: 'Lucas Ridge - Full-Stack Developer',
  meta: [{name: 'Lucas Ridge - Full-Stack Developer'}],
})

onMounted(() => {
  console.log(`Build Hash: ${config.public.buildHash}`)
  console.log(`Build Id: ${config.public.buildId}`)
})
</script>
