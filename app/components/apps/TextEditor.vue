<template>
  <div class="h-full flex flex-col overflow-hidden" style="background:#0d0d16;">
    <!-- Toolbar -->
    <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[--gnome-border] shrink-0"
      style="background:rgba(14,14,26,0.7);">
      <UTooltip text="New file" :delay="{ open: 600 }">
        <UButton variant="ghost" color="neutral" size="xs" square icon="i-heroicons-document-plus" @click="newFile" />
      </UTooltip>
      <UTooltip text="Save" :delay="{ open: 600 }">
        <UButton variant="ghost" color="neutral" size="xs" square icon="i-heroicons-cloud-arrow-up" @click="saveFile" />
      </UTooltip>

      <div class="w-px h-4 mx-1" style="background:var(--gnome-border);" />

      <UTooltip text="Undo" :delay="{ open: 600 }">
        <UButton variant="ghost" color="neutral" size="xs" square icon="i-heroicons-arrow-uturn-left" @click="undo" />
      </UTooltip>
      <UTooltip text="Redo" :delay="{ open: 600 }">
        <UButton variant="ghost" color="neutral" size="xs" square icon="i-heroicons-arrow-uturn-right" @click="redo" />
      </UTooltip>

      <div class="w-px h-4 mx-1" style="background:var(--gnome-border);" />

      <span class="text-[12px] font-mono text-[--gnome-text-dim] px-1">{{ activeFilename }}</span>
      <UBadge v-if="isDirty" color="warning" variant="soft" size="xs">unsaved</UBadge>

      <div class="flex-1" />
      <span class="text-[11px] font-mono text-[--gnome-text-dim]">{{ lineCount }} ln · {{ charCount }} ch</span>
    </div>

    <!-- File tabs -->
    <div class="flex border-b border-[--gnome-border] shrink-0" style="background:rgba(10,10,20,0.5);">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] border-b-2 transition-colors whitespace-nowrap cursor-pointer"
        :class="activeTab === tab.id
          ? 'border-[--gnome-blue] text-(--gnome-text)'
          : 'border-transparent text-[--gnome-text-dim] hover:bg-white/[0.03]'"
        @click="activeTab = tab.id"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.name }}</span>
        <button
          v-if="tabs.length > 1"
          class="ml-1 w-4 h-4 rounded flex items-center justify-center text-[9px] opacity-0 hover:!opacity-100 transition-opacity hover:bg-[--gnome-red]/20 hover:text-[--gnome-red]"
          :class="{ '!opacity-40': activeTab === tab.id }"
          @click.stop="closeTab(tab.id)"
          aria-label="Close tab"
        >✕</button>
      </button>
    </div>

    <!-- Editor body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Line numbers -->
      <div class="editor-gutter">
        <div v-for="n in lineCount" :key="n" class="editor-line-num">{{ n }}</div>
      </div>

      <!-- Textarea -->
      <textarea
        ref="textareaEl"
        v-model="content"
        class="editor-textarea"
        spellcheck="false"
        @keydown.tab.prevent="insertTab"
        @click="updateCursor"
        @keyup="updateCursor"
        aria-label="Text editor"
      />
    </div>

    <!-- Status bar -->
    <div class="flex gap-4 px-3 py-1 border-t border-[--gnome-border] text-[11px] font-mono text-[--gnome-text-dim] shrink-0"
      style="background:rgba(10,10,20,0.6);">
      <span>{{ cursorPos }}</span>
      <span>UTF-8</span>
      <span>Plain Text</span>
      <span v-if="isDirty" class="text-[--gnome-yellow]">● Modified</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

const textareaEl = ref<HTMLTextAreaElement | null>(null)
const cursorPos  = ref('Ln 1, Col 1')

const DEFAULT_CONTENT = `# Welcome to Portfolio Text Editor

A lightweight editor for notes and ideas.

## Keyboard shortcuts
  Tab   — Insert 2 spaces
  Ctrl+Z / Ctrl+Y — Undo / Redo

## Ideas to personalise your portfolio
- Update the About Me section with your real details
- Add your actual projects to ProjectsApp.vue
- Tweak the Terminal commands in TerminalApp.vue
- Adjust the colour palette in assets/css/main.css

Happy hacking! 🚀
`

interface Tab { id: number; name: string; icon: string }

const tabs     = ref<Tab[]>([{ id: 1, name: 'README.md', icon: '📝' }, { id: 2, name: 'notes.txt', icon: '📄' }])
const activeTab = ref(1)
const contents  = ref<Record<number, string>>({ 1: DEFAULT_CONTENT, 2: '' })
const saved     = ref<Record<number, string>>({ 1: DEFAULT_CONTENT, 2: '' })

const content = computed({
  get: () => contents.value[activeTab.value] ?? '',
  set: (v: string) => { contents.value[activeTab.value] = v }
})

const activeFilename = computed(() => tabs.value.find(t => t.id === activeTab.value)?.name ?? 'untitled')
const lineCount      = computed(() => content.value.split('\n').length)
const charCount      = computed(() => content.value.length)
const isDirty        = computed(() => content.value !== saved.value[activeTab.value])

function updateCursor() {
  const el = textareaEl.value
  if (!el) return
  const before = content.value.substring(0, el.selectionStart)
  const lines   = before.split('\n')
  cursorPos.value = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`
}

function insertTab() {
  const el = textareaEl.value!
  const s  = el.selectionStart
  contents.value[activeTab.value] = content.value.substring(0, s) + '  ' + content.value.substring(el.selectionEnd)
  nextTick(() => { el.selectionStart = el.selectionEnd = s + 2 })
}

function newFile() {
  const id = Date.now()
  tabs.value.push({ id, name: 'untitled.txt', icon: '📄' })
  contents.value[id] = ''; saved.value[id] = ''
  activeTab.value = id
}

function saveFile() { saved.value[activeTab.value] = content.value }

function closeTab(id: number) {
  if (tabs.value.length === 1) return
  const idx = tabs.value.findIndex(t => t.id === id)
  tabs.value.splice(idx, 1)
  if (activeTab.value === id) activeTab.value = tabs.value[Math.max(0, idx - 1)].id
}

function undo() { document.execCommand('undo') }
function redo() { document.execCommand('redo') }
</script>
