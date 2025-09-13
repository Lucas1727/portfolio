<template>
  <div :id="`${id}-app`" class="app" @click="openWindow(id)">
    <div class="app-label">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
import {openWindow} from "assets/ts/desktop"

const props = defineProps<{
  id: string,
  name: string,
  image: string,
}>()

onMounted(() => {
  setBackgroundImage();
});

function setBackgroundImage() {
  const element = document.getElementById(`${props.id}-app`);

  if (element) {
    element.style.backgroundImage = `url(${props.image})`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
  }
}

</script>

<style scoped></style>
