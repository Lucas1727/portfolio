<template>
  <UDashboardPanel>
    <UDashboardNavbar class="flex z-10 h-10 bg-(--gnome-bg) border-b border-(--gnome-border) opacity-75">
      <div class="absolute flex items-center left-1/2 -translate-x-1/2 gap-2 top-2">
        <p class="font-semibold text-(--gnome-text)">
          {{ dateTime }}
        </p>
      </div>

      <div class="absolute flex items-center right-4 gap-2 top-2">
        <UPopover>
          <UButton variant="ghost" class="text-(--gnome-text) hover:text-(--gnome-text) hover:bg-transparent active:bg-transparent" title="Wi-Fi">
            <UIcon name="i-heroicons-wifi" class="size-6"/>
          </UButton>

          <template #content>
            <UCard variant="solid" class="flex p-2! rounded-md gap-2 bg-(--gnome-panel) text-center">
              <p class="text-[12px] text-(--gnome-text-dim)">portfolio.faenor.co.uk</p>
              <p class="text-[12px] text-(--gnome-text-dim)">{{ ping }} ping</p>
            </UCard>
          </template>
        </UPopover>

        <UButton variant="ghost" class="text-(--gnome-text-dim) hover:text-(--gnome-text) hover:bg-transparent active:bg-transparent" title="Audio">
          <UIcon name="i-heroicons-speaker-wave" class="size-6"/>
        </UButton>

        <!--        <UDropdownMenu :items="powerItems" :content="{ align: 'end', sideOffset: 6 }">-->
        <UButton variant="ghost" class="text-(--gnome-text-dim) hover:text-(--gnome-text) hover:bg-transparent active:bg-transparent" title="Power">
          <UIcon name="i-heroicons-power" class="size-6"/>
        </UButton>
        <!--        </UDropdownMenu>-->
      </div>
    </UDashboardNavbar>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const dateTime = ref<string>('')
const host = ref<string>('https://portfolio.faenor.co.uk');
const ping = ref<number>(0);

let interval: ReturnType<typeof setInterval>

function updateClock() {
  dateTime.value = getDateString(Date.now(), 'DD MMMM HH:mm')
}

function updatePing() {
  const start = new Date().getTime()

  $fetch(host.value).then(() => {
    ping.value = new Date().getTime() - start
  }).catch(() => {
    ping.value = 999;
  })
}

const powerItems = [
  {label: 'Lock Screen', icon: 'i-heroicons-lock-closed'},
  {label: 'Suspend', icon: 'i-heroicons-pause-circle'},
  {label: 'Power Off', icon: 'i-heroicons-power'}
]

onMounted(() => {
  updateClock()
  updatePing()

  interval = setInterval(() => {
    updateClock()
    updatePing()
  }, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>
