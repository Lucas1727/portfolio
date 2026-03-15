<template>
  <div ref="windowElement"
       class="window-base"
       :class="{ focused: window.isFocused, maximized: window.isMaximized }"
       :style="windowStyle"
       @mousedown="onFocus"
       role="dialog"
       :aria-label="window.title">

    <div class="window-titlebar select-none" @mousedown.self="startDrag" @dblclick="doMaximize">
      <div class="absolute flex items-center left-1/2 -translate-x-1/2 gap-2 pointer-events-none">
        <span class="text-[14px] font-semibold"
              :class="window.isFocused ? 'text-(--gnome-text)' : 'text-(--gnome-text-dim)'">
          {{ window.title }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <UButton class="text-(--gnome-text)" variant="ghost" :icon="window.icon"></UButton>
      </div>

      <div class="flex-1"/>

      <div class="flex items-center gap-2">
        <UTooltip text="Minimize" :delay="{ open: 500 }">
          <UButton class="traffic-btn bg-(--traffic-green) hover:bg-(--traffic-green) active:bg-(--traffic-green)" icon="mdi-minimize" @click.stop="minimize" aria-label="Minimize"></UButton>
        </UTooltip>

        <UTooltip text="Maximize" :delay="{ open: 500 }">
          <UButton class="traffic-btn bg-(--traffic-amber) hover:bg-(--traffic-amber) active:bg-(--traffic-amber)" icon="mdi-maximize" @click.stop="doMaximize" aria-label="Maximize"></UButton>
        </UTooltip>

        <UTooltip text="Close" :delay="{ open: 500 }">
          <UButton class="traffic-btn bg-(--traffic-red) hover:bg-(--traffic-red) active:bg-(--traffic-red)" icon="mdi-close" @click.stop="close" aria-label="Close"></UButton>
        </UTooltip>
      </div>
    </div>

    <div class="window-content">
      <component :is="resolveApp(window.component)" :window-id="window.id"/>
    </div>

    <template v-if="!window.isMaximized">
      <div v-for="dir in resizeDirs" :key="dir" class="resize-handle" :class="`resize-${dir}`" @mousedown.stop="startResize(dir)"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import About from '~/components/apps/About.vue'
import Skills from '~/components/apps/Skills.vue'
import Terminal from '~/components/apps/Terminal.vue'
import TextEditor from '~/components/apps/TextEditor.vue'
import Experience from "~/components/apps/Experience.vue";

const {closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateWindowBounds} = useWindowManager()

const APP_COMPONENTS: Record<string, any> = {
  AboutApp: About, ExperienceApp: Experience, SkillsApp: Skills, TerminalApp: Terminal, TextEditorApp: TextEditor,
}

const props = defineProps<{ window: AppWindow }>()

const windowElement = ref<HTMLElement | null>(null)
const resizeDirs = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

const windowStyle = computed(() => ({
  left: props.window.x + 'px', top: props.window.y + 'px',
  width: props.window.width + 'px', height: props.window.height + 'px',
  zIndex: props.window.zIndex
}))

const resolveApp = (name: string) => APP_COMPONENTS[name] ?? null

const onFocus = () => focusWindow(props.window.id)
const close = () => closeWindow(props.window.id)
const minimize = () => minimizeWindow(props.window.id)
const doMaximize = () => toggleMaximize(props.window.id)

let drag: { startX: number; startY: number; winX: number; winY: number } | null = null
let resize: { dir: string; startX: number; startY: number; oX: number; oY: number; oW: number; oH: number } | null = null

function startDrag(e: MouseEvent) {
  if (props.window.isMaximized) return

  focusWindow(props.window.id)

  drag = {startX: e.clientX, startY: e.clientY, winX: props.window.x, winY: props.window.y}

  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', stopDrag)

  e.preventDefault()
}

function onDragMove(e: MouseEvent) {
  if (!drag) return
  updateWindowBounds(props.window.id, {
    x: Math.max(-props.window.width + 100, drag.winX + e.clientX - drag.startX),
    y: Math.max(0, drag.winY + e.clientY - drag.startY)
  })
}

function stopDrag() {
  drag = null

  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', stopDrag)
}

function startResize(dir: string) {
  const e = event as MouseEvent

  focusWindow(props.window.id)

  resize = {dir, startX: e.clientX, startY: e.clientY, oX: props.window.x, oY: props.window.y, oW: props.window.width, oH: props.window.height}

  window.addEventListener('mousemove', onResizeMove)
  window.addEventListener('mouseup', stopResize)

  e.preventDefault()
}

function onResizeMove(e: MouseEvent) {
  if (!resize) return

  const {dir, startX, startY, oX, oY, oW, oH} = resize
  const dx = e.clientX - startX, dy = e.clientY - startY
  const mW = props.window.minWidth, mH = props.window.minHeight

  let x = oX, y = oY, w = oW, h = oH

  if (dir.includes('e')) w = Math.max(mW, oW + dx)
  if (dir.includes('s')) h = Math.max(mH, oH + dy)
  if (dir.includes('w')) {
    w = Math.max(mW, oW - dx);
    if (w > mW) x = oX + dx
  }
  if (dir.includes('n')) {
    h = Math.max(mH, oH - dy);
    if (h > mH) y = oY + dy
  }
  updateWindowBounds(props.window.id, {x, y, width: w, height: h})
}

function stopResize() {
  resize = null

  window.removeEventListener('mousemove', onResizeMove)
  window.removeEventListener('mouseup', stopResize)
}
</script>

<style src="~/assets/css/window.css"></style>