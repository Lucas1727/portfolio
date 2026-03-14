<template>
  <div class="h-full overflow-y-auto flex flex-col">
    <div class="flex items-center gap-6 px-7 py-7 border-b border-[--gnome-border] shrink-0" style="background:linear-gradient(135deg,rgba(137,180,250,0.07),rgba(203,166,247,0.05))">
      <!--      <div class="relative shrink-0">-->
      <!--        <div class="absolute -inset-1 rounded-full" style="background:conic-gradient(var(&#45;&#45;gnome-blue),var(&#45;&#45;gnome-purple),var(&#45;&#45;gnome-green),var(&#45;&#45;gnome-blue));animation:spin 7s linear infinite;"/>-->
      <!--        <div class="relative w-[72px] h-[72px] rounded-full flex items-center justify-center text-4xl border-[3px] border-[&#45;&#45;gnome-surface]" style="background:var(&#45;&#45;gnome-panel-2);">🧑‍💻-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="flex flex-col gap-2" style="margin: 8px">
        <h1 class="text-2xl font-bold text-white">Lucas Ridge</h1>
        <p class="text-[14px] text-[--gnome-text-dim]">Full-Stack Developer</p>
        <!--        <div class="flex flex-wrap gap-1.5">-->
        <!--          <UBadge color="primary" variant="soft">Vue / Nuxt</UBadge>-->
        <!--          <UBadge color="success" variant="soft">Node.js</UBadge>-->
        <!--          <UBadge color="secondary" variant="soft">TypeScript</UBadge>-->
        <!--          <UBadge color="error" variant="soft">UI / UX</UBadge>-->
        <!--        </div>-->
      </div>
    </div>

    <div class="flex flex-col gap-4" style="margin: 8px">
      <section>
        <p class="text-[12px] font-bold uppercase tracking-widest text-[--gnome-text-dim] mb-2 flex items-center gap-2">
          <UIcon name="i-heroicons-map-pin" class="size-4"/>
          About
        </p>
        <p class="text-[12px] leading-relaxed text-(--gnome-text) mb-2">
          Hi there! I'm a highly motivated Full Stack Developer with an MSc in Software Engineering and a proven track record of building scalable web applications and cloud infrastructure, I am currently driving
          front-end and back-end integration at vTime. I specialise in a diverse tech stack (Kotlin/Java, C#, Python, and Vue.js/Nuxt) architecting and maintaining remote, high-availability databases and web applications across distributed
          cloud environments, ensuring consistent performance and security. Furthermore, I am passionate to consistently stay at the forefront of emerging technologies, frequently self-teaching new languages and frameworks in my own time to
          remain versatile. I apply this knowledge by utilizing AWS and Docker to containerise and deploy robust services efficiently.
        </p>
      </section>

      <USeparator/>

      <section>
        <p class="text-[11px] font-bold uppercase tracking-widest text-[--gnome-text-dim] mb-2 flex items-center gap-2">
          <UIcon name="i-heroicons-bolt" class="size-3.5"/>
          What I Do
        </p>
        <div class="grid grid-cols-3 gap-2">
          <UCard v-for="item in whatIDo" :key="item.title" class="flex items-start gap-4 p-4" :ui="{ root: 'bg-[--gnome-surface-2] border border-[--gnome-border] rounded-xl p-4' }">
            <span class="text-xl shrink-0 mt-1">{{ item.icon }}</span>

            <div>
              <p class="text-[14px] font-bold text-white mb-1">{{ item.title }}</p>
              <p class="text-[12px] text-[--gnome-text-dim] leading-snug">{{ item.desc }}</p>
            </div>
          </UCard>
        </div>
      </section>

      <USeparator/>

      <!--      <UMarquee>-->
      <!--        <UIcon name="i-simple-icons-github" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-x" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0"/>-->
      <!--        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0"/>-->
      <!--      </UMarquee>-->

      <section>
        <p class="text-[11px] font-bold uppercase tracking-widest text-[--gnome-text-dim] mb-2 flex items-center gap-2">
          <UIcon name="i-heroicons-at-symbol" class="size-4"/>
          Find Me
        </p>
        <div class="flex flex-wrap gap-2">
          <UButton
              v-for="link in links"
              :key="link.label"
              :to="link.href"
              target="_blank"
              variant="soft"
              color="neutral"
              size="sm"
              :leading-icon="link.uiIcon">
            {{ link.label }}
          </UButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ windowId: string }>()

const whatIDo = [
  {icon: '🌐', title: 'Frontend Development', desc: 'Vue, Nuxt, Typescript, Tailwind'},
  {icon: '⚙️', title: 'Backend Systems', desc: 'Kotlin, Python, C#, MySQL, Postgres'},
  {icon: '☁️', title: 'DevOps', desc: 'CI/CD, Docker, AWS, Google Cloud'}
]

const links = [
  {icon: '💼', uiIcon: 'i-simple-icons-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucas-ridge-08964942'},
  {icon: '📧', uiIcon: 'i-heroicons-envelope', label: 'Email', href: 'mailto:lucasridge1727@gmail.com'}
]
</script>
