<template>
  <div class="fixed top-16 left-4 z-5 flex flex-col flex-wrap gap-2">
    <UButton v-for="app in apps" :key="app.id" class="flex flex-col items-center border-2 border-transparent hover:bg-transparent text-(--gnome-text)" variant="ghost"
             @dblclick="launch(app)" @click="activeId = app.id" @blur="activeId = null" :title="app.description" :aria-label="app.name">
      <UIcon :name="app.icon" class="size-16 hover:scale-120 transition-all duration-100"/>
      <span class="text-sm font-semibold text-center text(--gnome-text) wrap-break-word">
        {{ app.name }}
      </span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
const {apps} = applications()
const {openWindow} = windowManager()
const activeId = ref<string | null>(null)

function launch(app: typeof apps[0]) {
  const vw = window.innerWidth
  const vh = window.innerHeight - 40

  openWindow({
    id: app.id, title: app.name, icon: app.icon, component: app.component,
    x: Math.floor((vw - app.defaultWidth) / 2),
    y: Math.max(40, Math.floor((vh - app.defaultHeight) / 2)),
    width: app.defaultWidth, height: app.defaultHeight,
    minWidth: app.minWidth ?? 320, minHeight: app.minHeight ?? 240
  })
}

onMounted(() => {
  setTimeout(() => {
    launch(apps[0]);
  }, 500)
})
</script>
