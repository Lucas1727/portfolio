<template>
  <div class="flex flex-col gap-4" style="margin: 8px">
    <div v-for="group in skills" :key="group.category">
      <p class="text-[12px] font-bold uppercase tracking-widest text-[--gnome-text-dim] mb-3">{{ group.category }}</p>
      <div class="flex flex-col gap-2">
        <div v-for="skill in group.skills" :key="skill.name">
          <div class="flex justify-between">
            <p class="text-[14px] text-(--gnome-text) justify my-auto">
              <UIcon :name="skill.icon" class="size-4"/>
              {{ skill.name }}
            </p>
          </div>

          <div class="skill-track">
            <div class="skill-fill" :style="{ width: animated ? skill.level + '%' : '0%', background: skill.color }"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

const animated = ref(false)
onMounted(() => setTimeout(() => {
  animated.value = true
}, 100))

const skills = [
  {
    category: 'Frontend', skills: [
      {name: 'Vue / Nuxt', icon: 'logos:nuxt-icon', level: 95, color: 'linear-gradient(90deg,var(--gnome-green),color-mix(in srgb, var(--gnome-green) 50%, transparent))'},
      {name: 'Javascript/TypeScript', icon: 'logos:typescript-icon', level: 90, color: 'linear-gradient(90deg,var(--gnome-blue),color-mix(in srgb, var(--gnome-blue) 50%, transparent))'},
      {name: 'CSS / Tailwind', icon: 'devicon:tailwindcss', level: 85, color: 'linear-gradient(90deg,var(--gnome-purple),color-mix(in srgb, var(--gnome-blue) 50%, transparent))'},
    ]
  },
  {
    category: 'Backend', skills: [
      {name: 'Kotlin/Java', icon: 'logos:kotlin-icon', level: 90, color: 'linear-gradient(90deg,var(--gnome-purple),color-mix(in srgb, var(--gnome-red) 50%, transparent))'},
      {name: 'Python', icon: 'logos:python', level: 75, color: 'linear-gradient(90deg,var(--gnome-yellow),color-mix(in srgb, var(--gnome-blue) 50%, transparent))'},
      {name: 'PostgreSQL/MySQL', icon: 'logos:postgresql', level: 80, color: 'linear-gradient(90deg,var(--gnome-blue),color-mix(in srgb, var(--gnome-orange) 50%, transparent))'},
      {name: 'C#', icon: 'devicon:csharp', level: 80, color: 'linear-gradient(90deg,var(--gnome-purple),color-mix(in srgb, var(--gnome-purple) 50%, transparent))'},
    ]
  },
  {
    category: 'Deployment', skills: [
      {name: 'Docker', icon: 'logos:docker-icon', level: 85, color: 'linear-gradient(90deg,var(--gnome-blue),color-mix(in srgb, var(--gnome-blue) 50%, transparent))'},
      {name: 'CI / CD', icon: 'logos:typescript-icon', level: 70, color: 'linear-gradient(90deg,var(--gnome-purple),color-mix(in srgb, var(--gnome-purple) 50%, transparent))'},
      {name: 'AWS', icon: 'logos:aws', level: 75, color: 'linear-gradient(90deg,var(--gnome-orange),color-mix(in srgb, var(--gnome-orange) 50%, transparent))'},
    ]
  },
]
</script>
