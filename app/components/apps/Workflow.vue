<template>
  <div class="flex flex-col overflow-y-auto">
    <div class="flex flex-col gap-2" style="margin: 8px">
      <h1 class="text-2xl font-bold text-center">Development Workflow</h1>
    </div>

    <!--    <div class="flex flex-col gap-2" style="margin: 8px">-->
    <!--      <UTree :items="items"/>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

import type {TreeItem} from '@nuxt/ui'

const items = ref<TreeItem[]>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript'
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript'
          }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue'
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue'
          }
        ]
      }
    ]
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue'
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt'
  }
])
</script>

<style scoped></style>
