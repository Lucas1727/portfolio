<template>
  <div class="flex flex-col overflow-y-auto">

    <div class="flex flex-col gap-2 m-2">
      <h1 class="text-2xl font-bold text-center">Website Creation</h1>
    </div>

    <div class="flex flex-col gap-4 m-2">
      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="text-xl font-semibold">Initialization</h2>
        <p>Created a new Nuxt 4 project:</p>
        <CodeBlock lang="bash" code="npx nuxi@latest init portfolio"/>
        <p>Installed Dependencies (NUXT UI and Tailwind CSS)</p>
        <CodeBlock lang="bash" code="npm install @nuxt/ui tailwindcss"/>
        <p>Run the webpage in development mode</p>
        <CodeBlock lang="bash" code="npm run dev"/>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="text-xl font-semibold">Development</h2>
        <p>Created some Vue components, global styling and typescript composables</p>
        <UTree :items="items"/>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="text-xl font-semibold">Testing</h2>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="text-xl font-semibold">Deployment</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "~/components/CodeBlock.vue";
import type {TreeItem} from '@nuxt/ui'

defineProps<{ windowId: string }>()

const baseGitHubUrl = 'https://github.com/Lucas1727/portfolio/blob/master'

const items = ref<TreeItem[]>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'assets/',
        defaultExpanded: false,
        children: [
          {
            label: 'css/',
            defaultExpanded: true,
            children: [
              {
                label: 'main.css',
                icon: 'i-vscode-icons-file-type-css',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/assets/css/main.css`, '_blank')?.focus()
                }
              },
              {
                label: 'window.css',
                icon: 'i-vscode-icons-file-type-css',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/assets/css/window.css`, '_blank')?.focus()
                }
              },
            ]
          },
        ]
      },
      {
        label: 'components/',
        defaultExpanded: false,
        children: [
          {
            label: 'CodeBlock.vue',
            icon: 'i-vscode-icons-file-type-vue',
            onSelect() {
              window.open(`${baseGitHubUrl}/app/components/CodeBlock.vue`, '_blank')?.focus()
            }
          },
          {
            label: 'apps/',
            defaultExpanded: true,
            children: [
              {
                label: 'About.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/apps/About.vue`, '_blank')?.focus()
                }
              },
              {
                label: 'Experience.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/apps/Experience.vue`, '_blank')?.focus()
                }
              },
              {
                label: 'Skills.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/apps/Skills.vue`, '_blank')?.focus()
                }
              },
              {
                label: 'Terminal.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/apps/Terminal.vue`, '_blank')?.focus()
                }
              },
              {
                label: 'Workflow.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/apps/Workflow.vue`, '_blank')?.focus()
                }
              },
            ]
          },
          {
            label: 'desktop/',
            defaultExpanded: true,
            children: [
              {
                label: 'Window.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                  window.open(`${baseGitHubUrl}/app/components/desktop/Window.vue`, '_blank')?.focus()
                }
              }
            ]
          }
        ]
      },
      {
        label: 'composables/',
        defaultExpanded: false,
        children: [
          {
            label: 'applications.ts',
            icon: 'i-vscode-icons-file-type-typescript',
            onSelect() {
              window.open(`${baseGitHubUrl}/app/composables/applications.ts`, '_blank')?.focus()
            }
          },
          {
            label: 'windowManager.ts',
            icon: 'i-vscode-icons-file-type-typescript',
            onSelect() {
              window.open(`${baseGitHubUrl}/app/composables/windowManager.ts`, '_blank')?.focus()
            }
          }
        ]
      },
      {
        label: 'app.vue',
        icon: 'i-vscode-icons-file-type-vue',
        onSelect() {
          window.open(`${baseGitHubUrl}/app/app.vue`, '_blank')?.focus()
        }
      },
    ]
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
    onSelect() {
      window.open(`${baseGitHubUrl}/nuxt.config.ts`, '_blank')?.focus()
    }
  }
])
</script>

<style scoped>
p {
  color: var(--gnome-text-dim);
}
</style>
