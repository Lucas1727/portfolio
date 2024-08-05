<template>
  <v-container fluid id="background">
    <!--    <v-sheet style="height: 100vh"></v-sheet>-->

    <v-img v-if="fly" v-for="item in currentBackgrounds" :src="item" height="256" width="256" class="fly"></v-img>
    <v-img v-if="zoom" v-for="item in currentBackgrounds" :src="item" height="256" width="256" class="zoom"></v-img>

    <div style="padding-top: 2em;">
      <div id="cv-app" class="app" @click="openCV">
        <div class=app-label>CV</div>
      </div>

      <div id="terminal-app" class="app" @click="openWindow('terminal')">
        <div class=app-label>Terminal</div>
      </div>

      <div id="settings-app" class="app" @click="openWindow('settings')">
        <div class=app-label>Settings</div>
      </div>
    </div>

    <!--     TODO - Move these to separate components-->
    <div id="settings" class="window">
      <div id="settings-navbar" class="window-navbar">
        <v-spacer></v-spacer>
        <div @click="toggleWindow('settings')" class="nav-btn" style="background-color: #5ac846"></div>
        <div @click="sizeWindow('settings')" class="nav-btn" style="background-color: #f0c828"></div>
        <div @click="closeWindow('settings')" class="nav-btn" style="background-color: #f0645a"></div>
      </div>

      <div id="settings-body" class="window-body">
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
      </div>
    </div>

    <!--    TODO - Move these to separate components-->
    <div id="terminal" class="window">
      <div id="terminal-navbar" class="window-navbar">
        <v-spacer></v-spacer>
        <div @click="toggleWindow('terminal')" class="nav-btn" style="background-color: #5ac846"></div>
        <div @click="sizeWindow('terminal')" class="nav-btn" style="background-color: #f0c828"></div>
        <div @click="closeWindow('terminal')" class="nav-btn" style="background-color: #f0645a"></div>
      </div>

      <div id="terminal-body" class="window-body">
        <h1 class="typewriter">Hi!</h1>
        <h1 class="typewriter">I'm Lucas Ridge</h1>
        <h3 class="typewriter">{"occupation":"Web/Backend Developer"}</h3>
        <h3 class="typewriter">></h3>
      </div>
    </div>

    <v-footer v-if="ready" color="transparent">
      <div id="task-bar">
        <v-img v-for="item in currentApps" :key="item" class="task-icons" :src="item.image" :style="`height: ${item.height}; bottom: ${item.bottom}`" @click="taskBarClick(item.name)">
          <v-tooltip activator="parent" location="bottom" open-delay="500">{{ item.name }}</v-tooltip>
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="white" indeterminate></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>
    </v-footer>
  </v-container>
</template>

<script>
import {bringToFront, centerElement, dragElement, openElements, resetElement, shuffleArray} from "assets/ts/methods.ts";

export default {
  setup() {
  },
  data() {
    return {
      apps: [
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
      openApps: [],
      backgrounds: [],
      ready: false,
      fly: false,
      zoom: false,
    }
  },
  computed: {
    currentApps() {
      return this.openApps.map(item => this.apps.find(app => app.id === item));
    },
    currentBackgrounds() {
      return this.backgrounds;
    }
  },
  methods: {
    closeWindow(app) {
      const element = document.getElementById(app);
      if (openElements.includes(element)) {
        delete openElements[openElements.indexOf(element)];
        this.openApps = this.openApps.filter(item => item !== app);
        element.style.animation = "close 0.1s linear forwards";
        setTimeout(() => {
          resetElement(element);
        }, 100);
      }
    },
    loadElements() {
      // dragElement(document.getElementById("app1"));
      // dragElement(document.getElementById("app2"));
      dragElement(document.getElementById("terminal"));
      dragElement(document.getElementById("settings"));

      resetElement(document.getElementById("terminal"));
      resetElement(document.getElementById("settings"));

      openElements.push(document.getElementById('terminal'));
      this.openApps.push('terminal');
    },
    openCV() {
      window.open('/cv.pdf');
    },
    openWindow(app) {
      const element = document.getElementById(app);
      if (!openElements.includes(element) && !this.openApps.includes(app)) {
        openElements.push(element);
        this.openApps.push(app);
        bringToFront(element);
        element.style.animation = "maximize 0.25s linear forwards";
      }
    },
    populateBackground() {
      this.backgrounds = shuffleArray(this.apps.map(item => item.image)).slice(0, 5);
    },
    sizeWindow(app) {
      const element = document.getElementById(app);
      if (openElements.includes(element)) {
        if (element.offsetWidth > 16 * 40) {
          element.style.width = "40em";
          centerElement(element);
        } else {
          element.style.width = "80em";
          centerElement(element);
        }
      }
    },
    taskBarClick(item) {
      if (item === 'Terminal') this.toggleWindow('terminal');
      else if (item === 'Settings') this.toggleWindow('settings');
    },
    toggleZoom() {
      this.fly = false;
      this.zoom = true;
    },
    toggleFly() {
      this.fly = true;
      this.zoom = false;
    },
    toggleBackgroundIcon(app) {
      if (this.backgrounds.includes(app)) {
        this.backgrounds = this.backgrounds.filter(item => item !== app);
      } else {
        this.backgrounds.push(app);
      }
    },
    toggleWindow(app) {
      const element = document.getElementById(app);
      if (openElements.includes(element)) {
        delete openElements[openElements.indexOf(element)];
        element.style.animation = "minimize 0.25s linear forwards";
      } else {
        openElements.push(element);
        bringToFront(element);
        element.style.animation = "maximize 0.25s linear forwards";
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
