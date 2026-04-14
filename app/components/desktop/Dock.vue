<template>
  <nav class="fixed bottom-2 left-1/2 -translate-x-1/2 z-5" aria-label="Dock">
    <div class="dock flex items-center gap-2 rounded-2xl border border-(--gnome-border) min-w-16 min-h-4">
      <UTooltip v-for="app in runningApps" :key="app.id" :text="app.name" :delay="{ open: 250 }" :content="{ side: 'top' }">
        <UButton class="relative flex items-center justify-center border-transparent hover:bg-transparent text-(--gnome-text)" variant="ghost" @mouseenter="hovered = app.id" @mouseleave="hovered = null" @click="clickIcon(app)">
          <UIcon :name="app.icon" class="size-16 hover:scale-120 transition-all duration-100"/>
          <span v-if="isRunning(app.id)" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style="background:var(--gnome-blue);"/>
        </UButton>
      </UTooltip>
    </div>
  </nav>
</template>

<script setup lang="ts">
const {apps, getApp} = useApps()
const {windows, openWindow, focusWindow, maximizeWindow, minimizeWindow} = useWindowManager()
const hovered = ref<string | null>(null)

const isRunning = (id: string) => (windows as any).value.some((w: any) => w.id === id)
const isFocused = (id: string) => (windows as any).value.some((w: any) => w.id === id && w.isFocused && !w.isMinimized)

const runningApps = computed(() => {
  return apps.filter(app => isRunning(app.id))
})

function clickIcon(app: typeof apps[0]) {
  const existing = (windows as any).value.find((w: any) => w.id === app.id)

  if (existing) {
    if (existing.isMinimized) {
      maximizeWindow(existing.id)
    } else if (existing.isFocused) {
      minimizeWindow(existing.id)
    } else {
      focusWindow(existing.id)
    }

    return
  }

  const def = getApp(app.id)!
  const vw = window.innerWidth, vh = window.innerHeight - 40
  const x = Math.floor((vw - def.defaultWidth) / 2), y = Math.max(40, Math.floor((vh - def.defaultHeight) / 2))
  const width = def.defaultWidth, height = def.defaultHeight

  openWindow({id: app.id, title: app.name, icon: app.icon, component: app.component, x, y, width: width, height: height, minWidth: def.minWidth ?? 320, minHeight: def.minHeight ?? 240})
}
</script>

<style scoped>
.dock {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
</style>