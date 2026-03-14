<template>
  <div class="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 bg-(--gnome-bg)"/>
    <div v-for="orb in orbs" class="absolute rounded-full" :style="orb"/>
  </div>
</template>

<script setup lang="ts">
const colors = ['var(--gnome-blue)', 'var(--gnome-purple)', 'var(--gnome-green)', 'var(--gnome-teal)', 'var(--gnome-red)']
const orbs = Array.from({length: 5}, () => generateOrb())

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generateOrb() {
  const size = rand(280, 680)

  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${rand(-10, 80)}%`,
    left: `${rand(-10, 80)}%`,
    background: `radial-gradient(circle, ${colors[Math.floor(rand(0, colors.length))]})`,
    filter: 'blur(100px)',
    opacity: rand(0.15, 0.4),
    animation: `orbFloat ${rand(10, 20).toFixed(1)}s ease-in-out infinite -${rand(0, 10).toFixed(1)}s`,
  }
}
</script>

<style scoped></style>
