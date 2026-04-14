<template>
  <div class="flex flex-col gap-4 m-2">
    <UTimeline :items="experience" color="neutral" class="gap-4">
      <template #title="{ item }">
        <div class="flex items-center gap-1">
          <h1 class="text-(--gnome-text) text-lg">{{ item.title }}</h1>
          <h2 class="text-(--gnome-text-dim) text-lg">{{ item.company }}</h2>
        </div>
      </template>

      <template #description="{ item }">
        <div class="flex flex-col gap-1">
          <h1 v-for="description in item.description" class="text-(--gnome-text-dim)">{{ description }}</h1>
        </div>
      </template>
    </UTimeline>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

const animated = ref(false)
onMounted(() => setTimeout(() => {
  animated.value = true
}, 100))

const experience = [
  {
    title: 'Full-Stack Developer',
    company: 'vTime',
    date: '2024–Current',
    color: 'var(--gnome-purple)',
    icon: 'mdi:work-outline',
    description: [
      '▪ Front-end development using NUXT in addition to previous role responsibilities.',
      '▪ SEO management for public facing sites hosted by vTime.',
      '▪ GUI creation for Unity Projects and server side code for Unity Cloud.',
      '▪ Use of ML libraries in Python for making in house applications with GPU acceleration.'
    ]
  },
  {
    title: 'Server Developer',
    company: 'vTime',
    date: '2021–2024',
    color: 'var(--gnome-green)',
    icon: 'mdi:work-outline',
    description: [
      '▪ Creation and maintenance of multiple APIs, databases and websites.',
      '▪ Deployment of apps and services to cloud platforms such as AWS.',
      '▪ Utilisation of the docker platform for service rollout and internal tools.',
      '▪ The routing of traffic from domains through reverse proxies for services.',
      '▪ Creation of packages/libraries for frontend/backend app use for multiple projects',
      '▪ Remote management of multiple VMs across Windows and Linux environments.',
      '▪ Automated processes created inside of Jenkins and GitLab CI.'
    ],
  },
  {
    title: 'MSc Software Engineering',
    company: 'Aberystwyth University',
    date: '2018–2019',
    color: 'var(--gnome-yellow)',
    icon: 'nimbus:university',
    description: ['▪ BSc Project: "Educational Games for Computer Science"'],
  },
  {
    title: 'BSc Computer Science',
    company: 'Aberystwyth University',
    date: '2015–2018',
    color: 'var(--gnome-yellow)',
    icon: 'nimbus:university',
    description: ['▪ MSc Project: "Internet of Things display for smart homes"'],
  },
]
</script>
