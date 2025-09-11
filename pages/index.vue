<template>
  <v-container fluid id="background">

    <div style="padding-top: 2em;">
      <div id="cv-app" class="app" @click="openWindow('cv')">
        <div class=app-label>CV</div>
      </div>

      <div id="terminal-app" class="app" @click="openWindow('terminal')">
        <div class=app-label>Terminal</div>
      </div>

      <div id="settings-app" class="app" @click="openWindow('settings')">
        <div class=app-label>Settings</div>
      </div>
    </div>

    <window app="cv">
      <v-btn class="v-btn" @click="openCV" style="margin-bottom: 1em">Open CV in new tab</v-btn>
      <iframe style="width: 100%; height: 100%; border: none;" :src="cvUrl"></iframe>
    </window>

    <window app="settings">
      <h1>Settings</h1>
      <h2>Wallpaper</h2>
      <h3>Animation style</h3>
      <v-btn class="v-btn" @click="toggleFly">Fly</v-btn>
      <v-btn class="v-btn" @click="toggleZoom">Zoom</v-btn>
      <h3>Icon select</h3>
      <div class="icon-select">
        <v-img v-for="app in apps" :key="app" class="icon" :src="app.image" @click="toggleBackgroundIcon(app.image)">
          <v-tooltip activator="parent" location="bottom" open-delay="500">{{ app.name }}</v-tooltip>
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="white" indeterminate></v-progress-circular>
            </div>
          </template>
          <v-icon v-if="backgrounds.includes(app.image)" class=label style="color: green">mdi-check</v-icon>
          <v-icon v-else class=label style="color: red">mdi-check</v-icon>
        </v-img>
      </div>
      <v-btn class="v-btn" @click="populateBackground" style="margin-top: 1em">Randomize</v-btn>
      <v-divider class="v-divider"></v-divider>
      <h2>System</h2>
    </window>

    <window app="terminal">
      <h1 class="typewriter">Hi!</h1>
      <h1 class="typewriter">I'm Lucas Ridge</h1>
      <h3 class="typewriter">{"occupation":"Full Stack Developer"}</h3>
      <h3 class="typewriter">></h3>
    </window>

    <v-footer v-if="ready" color="transparent">
      <div id="task-bar">
        <v-img v-for="item in currentApps" :key="item" class="task-icons" :src="item.image" :style="`height: ${item.height}; bottom: ${item.bottom}`" @click="taskBarClick(item.id)">
          <v-tooltip activator="parent" location="bottom" open-delay="500">{{ item.name }}</v-tooltip>
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="white" indeterminate></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>
    </v-footer>

    <v-img v-if="fly" v-for="item in currentBackgrounds" :src="item" height="256" width="256" class="fly"></v-img>
    <v-img v-if="zoom" v-for="item in currentBackgrounds" :src="item" height="256" width="256" class="zoom"></v-img>

  </v-container>
</template>

<script lang="ts">
import {addElement, dragElement, openElements, openWindow, resetElement, toggleWindow} from "assets/ts/desktop";
import {shuffleArray} from "assets/ts/methods";

export default {
  setup() {
    return {
      openWindow
    };
  },
  data() {
    return {
      apps: [
        {id: 'about', name: 'About', image: 'word.svg', height: '3em', bottom: '1.8em'},
        {id: 'apple', name: 'Apple', image: 'apple.svg', height: '3em', bottom: '1.6em'},
        {id: 'cv', name: 'CV', image: 'word.svg', height: '3em', bottom: '1.8em'},
        {id: 'css', name: 'CSS', image: 'css.svg', height: '3em', bottom: '1.4em'},
        {id: 'docker', name: 'Docker', image: 'docker.svg', height: '3em', bottom: '1.4em'},
        {id: 'github', name: 'GitHub', image: 'github.svg', height: '3em', bottom: '1.4em'},
        {id: 'gitlab', name: 'GitLab', image: 'gitlab.svg', height: '3em', bottom: '1.4em'},
        {id: 'html', name: 'HTML', image: 'html.svg', height: '3em', bottom: '1.4em'},
        {id: 'java', name: 'Java', image: 'java.svg', height: '3em', bottom: '2.2em'},
        {id: 'javascript', name: 'JavaScript', image: 'javascript.svg', height: '3em', bottom: '1.4em'},
        {id: 'linkedin', name: 'LinkedIn', image: 'linkedin.svg', height: '3em', bottom: '1.4em'},
        {id: 'kotlin', name: 'Kotlin', image: 'kotlin.svg', height: '2.6em', bottom: '2em'},
        {id: 'mysql', name: 'MySQL', image: 'mysql.svg', height: '3em', bottom: '1.2em'},
        {id: 'linux', name: 'Linux', image: 'linux.svg', height: '3em', bottom: '1.4em'},
        {id: 'nuxt', name: 'Nuxt', image: 'nuxt.svg', height: '3em', bottom: '1.4em'},
        {id: 'postgres', name: 'Postgres', image: 'postgres.svg', height: '3em', bottom: '1.4em'},
        {id: 'terminal', name: 'Terminal', image: 'terminal.svg', height: '3em', bottom: '1.4em'},
        {id: 'settings', name: 'Settings', image: 'settings.svg', height: '3em', bottom: '1.6em'},
        {id: 'windows', name: 'Windows', image: 'windows.svg', height: '3em', bottom: '1.4em'},
      ],
      backgrounds: [],
      ready: false,
      fly: false,
      zoom: false,
      cvUrl: "https://docs.google.com/document/d/e/2PACX-1vTiNF5gQ9DOkbNGuza8HH6rEN-lO4MsLg5K8x8rwFWx9wKzcDxjUHnIpxuoVpEpaAzDNPMxfx-ZpW-2/pub?embedded=true"
    }
  },
  computed: {
    currentApps() {
      return openElements.map(item => this.apps.find(app => app.id === item.id)).filter(item => item !== undefined);
    },
    currentBackgrounds() {
      return this.backgrounds;
    }
  },
  methods: {
    loadElements() {
      dragElement(document.getElementById("cv"));
      dragElement(document.getElementById("terminal"));
      dragElement(document.getElementById("settings"));

      resetElement(document.getElementById("cv"));
      resetElement(document.getElementById("terminal"));
      resetElement(document.getElementById("settings"));

      addElement(document.getElementById('terminal'));
    },
    openCV() {
      window.open(this.cvUrl, '_blank');
    },
    populateBackground() {
      this.backgrounds = shuffleArray(this.apps.map(item => item.image)).slice(0, 5);
    },
    taskBarClick(item: string) {
      toggleWindow(item);
    },
    toggleZoom() {
      this.fly = false;
      this.zoom = true;
    },
    toggleFly() {
      this.fly = true;
      this.zoom = false;
    },
    toggleBackgroundIcon(app: string) {
      if (this.backgrounds.includes(app)) {
        this.backgrounds = this.backgrounds.filter(item => item !== app);
      } else {
        this.backgrounds.push(app);
      }
    },
  },
  mounted() {
    this.toggleZoom();
    this.loadElements();
    this.populateBackground();
    this.ready = true;
  },
}
</script>
