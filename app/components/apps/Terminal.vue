<template>
  <div class="terminal-root" ref="termEl" @click="focusInput">
    <div class="terminal-output" ref="outputEl">
      <div v-for="(line, i) in lines" :key="i" class="term-line" :class="`term-line-${line.type}`" v-html="line.html"/>
    </div>
    <div class="terminal-input-row">
      <span class="term-prompt">
        <span class="text-(--gnome-green)">user</span>
        <span class="text-(--gnome-blue)">@portfolio</span>
        <span class="text-(--gnome-text)">:</span>
        <span class="text-(--gnome-blue)">~</span>
        <span class="text-(--gnome-text)">$</span>
      </span>
      <input
          ref="inputEl"
          v-model="inputVal"
          class="term-input"
          autocomplete="off"
          spellcheck="false"
          @keydown.enter="submit"
          @keydown.up.prevent="historyUp"
          @keydown.down.prevent="historyDown"
          @keydown.tab.prevent="tabComplete"
          aria-label="Terminal input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

interface Line {
  html: string;
  type: 'output' | 'command' | 'error' | 'info'
}

const termEl = ref<HTMLElement | null>(null)
const outputEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const inputVal = ref('')
const lines = ref<Line[]>([])
const history: string[] = []

let histIdx = -1

const COMMANDS: Record<string, () => string | string[] | void> = {
  help: () => [
    '<span class="text-(--gnome-text-dim)">Available commands:</span>',
    '  <span class="text-(--gnome-teal)">whoami</span>       — Who is this person?',
    '  <span class="text-(--gnome-teal)">experience</span>   — Work history',
    '  <span class="text-(--gnome-teal)">python skills.py</span> — Run python script skills.py',
    '  <span class="text-(--gnome-teal)">cat resume.txt</span> — Output contents of resume.txt',
    '  <span class="text-(--gnome-teal)">ls</span>           — List files',
    '  <span class="text-(--gnome-teal)">clear</span>        — Clear terminal',
  ],
  whoami: () => [
    '<span class="text-(--gnome-blue)">Lucas Ridge</span> — Full-Stack Developer',
    'Based in <span class="text-(--gnome-green)">Liverpool, UK</span> · Open to remote opportunities.',
  ],
  'python skills.py': () => [
    '<span class="text-(--gnome-text-dim)">── Frontend ────────────────────────</span>',
    '  Vue/Nuxt     ███████████████████░',
    '  TypeScript   ██████████████████░░',
    '  CSS/Tailwind █████████████████░░░',
    '<span class="text-(--gnome-text-dim)">── Backend ─────────────────────────</span>',
    '  Kotlin/Java  ██████████████████░░',
    '  Python       ███████████████░░░░░',
    '  PostgreSQL   ████████████████░░░░',
    '  C#           ████████████████░░░░',
    '<span class="text-(--gnome-text-dim)">── Deployment ──────────────────────</span>',
    '  Docker       █████████████████░░░',
    '  CI/CD        ██████████████░░░░░░',
    '  AWS          ███████████████░░░░░',
  ],
  experience: () => [
    '  <span class="text-(--gnome-text)">BSc Computer Science</span> <span class="text-(--gnome-text-dim)">2015–2018</span>',
    '  <span class="text-(--gnome-text)">MSc Software Engineering</span> <span class="text-(--gnome-text-dim)">2018–2019</span>',
    '  <span class="text-(--gnome-text)">Server Developer</span> <span class="text-(--gnome-text-dim)">2021–2024</span>',
    '  <span class="text-(--gnome-text)">Full-Stack Developer</span> <span class="text-(--gnome-text-dim)">2024–2026</span>',
  ],
  'cat resume.txt': () => [
    '<span class="text-(--gnome-text-dim)">──────────────────────────────────────</span>',
    '<span class="text-(--gnome-text)">  Lucas — Full-Stack Developer</span>',
    '<span class="text-(--gnome-text-dim)">──────────────────────────────────────</span>',
    '  4 years building production web/server apps.',
    '  Speciality: Kotlin/Java, C#, Python, Vue/Nuxt, TypeScript, Docker.',
  ],
  ls: () => '<span class="text-(--gnome-green)">projects/</span> ' +
      '<span class="text-(--gnome-yellow)">resume.txt</span> ' +
      '<span class="text-(--gnome-purple)">skills.py</span> ',
  pwd: () => '/home/user',
  date: () => new Date().toString(),
  clear: () => {
    lines.value = []
  },
}

function print(html: string, type: Line['type'] = 'output') {
  lines.value.push({html, type})
}

function submit() {
  const cmd = inputVal.value.trim()

  if (!cmd) return
  history.unshift(cmd);
  histIdx = -1

  print(`<span class="text-(--gnome-blue)">user@portfolio:~$</span> ${esc(cmd)}`, 'command')

  const fn = COMMANDS[cmd.toLowerCase()]

  if (!fn) {
    print(`<span class="text-(--gnome-red)">bash: ${esc(cmd)}: command not found</span> — type <span class="text-(--gnome-teal)">help</span>`, 'error')
  } else {
    const result = fn()
    if (result !== undefined) {
      const arr = Array.isArray(result) ? result : [result as string]
      arr.forEach(l => print(l))
    }
  }
  inputVal.value = ''
  nextTick(() => {
    if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
  })
}

function historyUp() {
  if (histIdx < history.length - 1) {
    histIdx++;
    inputVal.value = history[histIdx]
  }
}

function historyDown() {
  if (histIdx > 0) {
    histIdx--;
    inputVal.value = history[histIdx]
  } else {
    histIdx = -1;
    inputVal.value = ''
  }
}

function tabComplete() {
  const matches = Object.keys(COMMANDS).filter(c => c.startsWith(inputVal.value))

  if (matches.length === 1) inputVal.value = matches[0]
  else if (matches.length > 1) {
    print(matches.join('  '), 'info');

    nextTick(() => {
      if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
    })
  }
}

function focusInput() {
  inputEl.value?.focus()
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

onMounted(() => {
  print('<span class="text-(--gnome-text-dim)">PortfolioOS 6.9.0 — GNU/Linux x86_64</span>', 'info')
  print('Welcome! Type <span class="text-(--gnome-teal)">help</span> to get started.', 'info')
  print('', 'output')

  nextTick(() => inputEl.value?.focus())
})
</script>

<style scoped src="~/assets/css/terminal.css"></style>
