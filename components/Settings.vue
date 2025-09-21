<template>
  <Window app="settings">
    <h1>Settings</h1>
    <h2>Wallpaper</h2>
    <h3>Animation style</h3>

<!--    <v-btn class="v-btn" @click="setBackgroundColor('#ff0000')" style="margin-right: 1em; margin-bottom: 1em">Dark</v-btn>-->
<!--    <v-btn class="v-btn" @click="setBackgroundColor('#ffffff')" style="margin-right: 1em; margin-bottom: 1em">Light</v-btn>-->
<!--    <v-btn class="v-btn" @click="setBackgroundSize(30)" style="margin-right: 1em; margin-bottom: 1em">Small</v-btn>-->
<!--    <v-btn class="v-btn" @click="setBackgroundSize(100)" style="margin-right: 1em; margin-bottom: 1em">Large</v-btn>-->
    <v-divider class="v-divider"></v-divider>
    <h2>System</h2>
  </Window>
</template>

<script setup lang="ts">

function initialiseBackground() {
  const element = document.getElementById(`background`);

  if (element) {
    element.style.backgroundImage = `radial-gradient(ellipse, red 0%, #1f1f1fff 10%)`;
    element.style.backgroundSize = '30px 30px';
    element.style.backgroundRepeat = 'repeat';
  }
}

function setBackgroundColor(color: number) {
  const element = document.getElementById(`background`);

  if (element) {
    element.style.backgroundImage = `radial-gradient(ellipse, ${color} 0%, #1f1f1fff 10%)`;
  }
}

function setBackgroundSize(size: string) {
  const element = document.getElementById(`background`);
  if (element) {
    element.style.backgroundSize = `${size}px ${size}px`;
  }
}

onMounted(() => {
  // initialiseBackground();
});

</script>

<style scoped>

</style>