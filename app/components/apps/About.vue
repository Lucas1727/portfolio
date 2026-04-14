<template>
  <div class="flex flex-col overflow-y-auto">
    <div class="flex bg-(--gnome-panel-2)">
      <div class="flex flex-col gap-2" style="margin: 8px">
        <h1 class="text-xl font-bold text-(--gnome-text)">Lucas Ridge</h1>
        <p class="text-md text-(--gnome-text-dim)">Full-Stack Developer</p>
      </div>

      <div class="flex-1"></div>

      <div class="flex gap-2 items-end" style="margin: 8px">
        <UButton v-for="link in links" :to="link.href" target="_blank" variant="ghost" color="neutral" :leading-icon="link.icon" class="text-(--gnome-text) hover:text-(--gnome-panel-2) p-1!">
          {{ link.label }}
        </UButton>
      </div>
    </div>

    <div class="flex flex-col gap-2" style="margin: 8px">
      <p class="flex items-center gap-2 font-bold text-sm text-(--gnome-text-dim) uppercase">
        <UIcon name="mdi:account" class="size-4"/>
        About
      </p>

      <p class="text-md text-(--gnome-text)">
        Hi there! I'm a highly motivated Full Stack Developer with an MSc in Software Engineering and a proven track record of building scalable web applications and cloud infrastructure, I am currently driving
        front-end and back-end integration at vTime. I specialise in a diverse tech stack (Kotlin/Java, C#, Python, and Vue.js/Nuxt) architecting and maintaining remote, high-availability databases and web applications across distributed
        cloud environments, ensuring consistent performance and security. Furthermore, I am passionate to consistently stay at the forefront of emerging technologies, frequently self-teaching new languages and frameworks in my own time to
        remain versatile. I apply this knowledge by utilizing AWS and Docker to containerise and deploy robust services efficiently.
      </p>

      <USeparator/>

      <p class="flex items-center gap-2 font-bold text-sm text-(--gnome-text-dim) uppercase">
        <UIcon name="i-heroicons-bolt" class="size-4"/>
        What I Do
      </p>

      <div class="grid grid-cols-3 gap-2">
        <UCard v-for="item in whatIDo" variant="solid" class="flex rounded-md gap-2" :style="item.background">
          <UIcon :name="item.icon" class="size-6 text-(--gnome-panel-2)"/>

          <div>
            <p class="text-md font-bold text-(--gnome-panel-2)">{{ item.title }}</p>
            <p class="text-sm text-(--gnome-panel-2)">{{ item.desc }}</p>
          </div>
        </UCard>
      </div>

      <USeparator/>

      <p class="flex items-center gap-2 font-bold text-sm text-(--gnome-text-dim) uppercase">
        <UIcon name="mdi:code" class="size-4"/>
        Work I've done
      </p>

      <div class="grid grid-cols-1 gap-2">
        <UButton v-for="item in workIveDone" target="_blank" color="neutral" class="relative flex flex-col px-16! py-12! text-center text-(--gnome-text) overflow-hidden" :to="item.href">
          <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${item.background})` }"/>
          <div class="absolute inset-0 bg-black/80 transition-all duration-200 hover:bg-black/90"/>

          <p class="relative z-10 text-lg font-bold">{{ item.title }}</p>
          <p class="relative z-10 text-md">{{ item.desc }}</p>
        </UButton>
      </div>

      <USeparator/>

      <p class="flex items-center gap-2 font-bold text-sm text-(--gnome-text-dim) uppercase">
        <UIcon name="tdesign:app" class="size-4"/>
        What I use
      </p>
      <UMarquee :overlay="false">
        <UIcon v-for="icon in whatIUse" :name="icon" class="size-10"/>
      </UMarquee>
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

const whatIUse = [
  'logos:vue', 'logos:nuxt-icon', 'logos:typescript-icon', 'devicon:tailwindcss',
  'logos:kotlin-icon', 'logos:python', 'logos:postgresql', 'devicon:csharp',
  'logos:docker-icon', 'logos:aws', 'logos:mysql', 'logos:electron', 'mdi:unity', 'logos:java'
]

const links = [
  {icon: 'i-simple-icons-github', label: 'GitHub', href: 'https://github.com/Lucas1727'},
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
    background: 'https://static.vtime.net/website/xr_1_mq.jpg',
    desc: 'Updated the vTime Website to use NUXT 3, a new CMS system and UI for content along with maintaining and upgrading the websites API that connects to multiple services.'
  },
  {
    title: 'vTime Games',
    href: 'https://vtimegames.com',
    background: 'https://vtimegames.com/_nuxt/vTime_Games_Logo_Horizontal.B95hJBiW.png',
    desc: 'Co-created the webpage for vTime Games, as well as creating all the SEO, dynamic scaling and optimisations for the webpage'
  },
  {
    title: 'Reality+ Website',
    href: 'https://www.realityplus.vtime.net',
    background: 'https://play-lh.googleusercontent.com/G4sc3Us-oo-6-I4TUAO4l_-igJFiS8BSZ3BX7WnlypWCeda0niX-e26-rtJeF0Q1ODvR=w1052-h592-rw',
    desc: 'Worked on the website and API that connects together with the Reality+ app.'
  },
  {
    title: 'Border Bots VR',
    href: 'https://vtimegames.com/our-games/border-bots-vr',
    background: 'https://static.vtime.net/website_games/border_bots/bb_final_vertical_logo_mq.png',
    desc: 'Created internal tools for the development of Border Bots VR, including a custom audio management system for easy organisation and integration of audio into the game engine.'
  },
  {
    title: 'Unreleased Team17 Game',
    href: 'https://vtime.net/news/2024/team17-partners-with-vtime-games-for-unannounced-title',
    background: 'https://directus.vtime.net/assets/a01fdf4b-fb57-46ae-979d-b653dfe6c36c',
    desc: 'Currently working on an unannounced title in partnership with Team17. Working on the UI system for the games engine and creation of Unity Cloud Code for core game functionality. Also creating QA and admin tools via electron for each role out to modify core game elements and cloud functionality'
  }
]
</script>
