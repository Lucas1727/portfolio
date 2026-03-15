<template>
  <div class="flex flex-col overflow-y-auto ">
    <div class="flex bg-(--gnome-panel-2)">
      <div class="flex flex-col gap-2" style="margin: 8px">
        <h1 class="text-[16px] font-bold text-(--gnome-text)">Lucas Ridge</h1>
        <p class="text-[14px] text-(--gnome-text-dim)">Full-Stack Developer</p>
      </div>

      <div class="flex-1"></div>

      <div class="flex gap-2 items-end" style="margin: 8px">
        <UButton v-for="link in links" :to="link.href" target="_blank" variant="ghost" color="neutral" :leading-icon="link.icon" class="text-(--gnome-text) hover:text-(--gnome-panel-2) p-1!">
          {{ link.label }}
        </UButton>
      </div>
    </div>

    <div class="flex flex-col gap-2" style="margin: 8px">
      <p class="flex items-center gap-2 font-bold text-[12px] text-(--gnome-text-dim) uppercase">
        <UIcon name="mdi:account" class="size-4"/>
        About
      </p>
      <p class="text-[14px] text-(--gnome-text)">
        Hi there! I'm a highly motivated Full Stack Developer with an MSc in Software Engineering and a proven track record of building scalable web applications and cloud infrastructure, I am currently driving
        front-end and back-end integration at vTime. I specialise in a diverse tech stack (Kotlin/Java, C#, Python, and Vue.js/Nuxt) architecting and maintaining remote, high-availability databases and web applications across distributed
        cloud environments, ensuring consistent performance and security. Furthermore, I am passionate to consistently stay at the forefront of emerging technologies, frequently self-teaching new languages and frameworks in my own time to
        remain versatile. I apply this knowledge by utilizing AWS and Docker to containerise and deploy robust services efficiently.
      </p>

      <USeparator/>

      <p class="flex items-center gap-2 font-bold text-[12px] text-(--gnome-text-dim) uppercase">
        <UIcon name="i-heroicons-bolt" class="size-4"/>
        What I Do
      </p>
      <div class="grid grid-cols-3 gap-2">
        <UCard v-for="item in whatIDo" variant="solid" class="flex p-2! rounded-md gap-2" :style="item.background">
          <UIcon :name="item.icon" class="size-6 text-(--gnome-panel-2)"/>

          <div>
            <p class="text-[14px] font-bold text-(--gnome-panel-2)">{{ item.title }}</p>
            <p class="text-[12px] text-(--gnome-panel-2)">{{ item.desc }}</p>
          </div>
        </UCard>
      </div>

      <USeparator/>

      <!--      <UMarquee>-->
      <!--        <UIcon name="i-simple-icons-github" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-x" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0"/>-->
      <!--      </UMarquee>-->

      <p class="flex items-center gap-2 font-bold text-[12px] text-(--gnome-text-dim) uppercase">
        <UIcon name="mdi:code" class="size-4"/>
        Work I've done
      </p>
      <div class="grid grid-cols-2 gap-2">
        <UButton v-for="item in workIveDone" target="_blank" variant="ghost" color="neutral" class="flex flex-col p-2! text-center text-(--gnome-panel-2) bg-(--gnome-text) hover:bg-(--gnome-text-bright) active:bg-(--gnome-text-bright) " :to="item.href">
          <p class="text-[14px] font-bold">{{ item.title }}</p>
          <p class="text-[12px]">{{ item.desc }}</p>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

const colors = ['--gnome-blue', '--gnome-purple', '--gnome-green', '--gnome-teal', '--gnome-red', '--gnome-yellow', '--gnome-orange']

function getStyle() {
  const color = colors[Math.floor(random(0, colors.length))]

  if (color && colors.length > 1) {
    colors.splice(colors.indexOf(color), 1)
  }

  return `background: color-mix(in srgb, var(${color}) 50%, white)`
}

const links = [
  {icon: 'i-simple-icons-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucas-ridge-08964942'},
  {icon: 'i-heroicons-envelope', label: 'Email', href: 'mailto:lucasridge1727@gmail.com'},
  {icon: 'mi:document', label: 'CV', href: 'https://docs.google.com/document/d/e/2PACX-1vTiNF5gQ9DOkbNGuza8HH6rEN-lO4MsLg5K8x8rwFWx9wKzcDxjUHnIpxuoVpEpaAzDNPMxfx-ZpW-2/pub'}
]

const whatIDo = [
  {icon: 'mdi:internet', title: 'Frontend Development', background: getStyle(), desc: 'Vue, Nuxt, Typescript, Tailwind'},
  {icon: 'uil:server', title: 'Backend Systems', background: getStyle(), desc: 'Kotlin, Python, C#, MySQL, Postgres'},
  {icon: 'ion:rocket-sharp', title: 'DevOps', background: getStyle(), desc: 'CI/CD, Docker, AWS, Google Cloud'}
]

const workIveDone = [
  {
    title: 'vTime Website',
    href: 'https://vtime.net',
    background: getStyle(),
    desc: 'Updated the vTime Website to use NUXT 3, a new CMS system and UI for content along with maintaining and upgrading the websites API that connects to multiple services.'
  },
  {
    title: 'vTime Games',
    href: 'https://vtimegames.com',
    background: getStyle(),
    desc: 'Co-created the webpage for vTime Games, as well as creating all the SEO, dynamic scaling and optimisations for the webpage'
  },
  {
    title: 'Reality+ Website',
    href: 'https://www.realityplus.vtime.net',
    background: getStyle(),
    desc: 'Worked on the website and API that connects together with the Reality+ app.'
  },
  {
    title: 'Border Bots VR',
    href: 'https://vtimegames.com/our-games/border-bots-vr',
    background: getStyle(),
    desc: 'Created internal tools for the development of Border Bots VR, like a custom audio management system during the making of the game.'
  }
]
</script>
