<template>
  <div class="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 bg-(--gnome-bg)"/>
    <div v-for="orb in orbs" class="absolute rounded-full" :style="orb"/>
  </div>
</template>

<script setup lang="ts">
const colors = ['--gnome-blue', '--gnome-purple', '--gnome-green', '--gnome-teal', '--gnome-red']
const orbs = Array.from({length: 5}, () => generateOrb())

function generateOrb() {
  const size = random(280, 680)

  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${random(-10, 80)}%`,
    left: `${random(-10, 80)}%`,
    background: `radial-gradient(circle, var(${colors[Math.floor(random(0, colors.length))]}))`,
    filter: 'blur(100px)',
    opacity: random(0.15, 0.4),
    animation: `orbFloat ${random(10, 20).toFixed(1)}s ease-in-out infinite -${random(0, 10).toFixed(1)}s`,
  }
}
</script>

<style scoped></style>
