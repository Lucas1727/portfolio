<template>
  <v-container fluid id="background">
    <!--    <v-sheet style="height: 100vh"></v-sheet>-->

    <v-img v-if="fly" v-for="item in backgrounds" :src="item" height="256" width="256" class="fly"></v-img>
    <v-img v-if="zoom" v-for="item in backgrounds" :src="item" height="256" width="256" class="zoom"></v-img>

    <div id="app1" class="app" style="top: 8vh; calc(5vw - 6em);"></div>
    <div id="app2" class="app" style="top: 20vh; calc(5vw - 6em);"></div>

    <div id="settings">
      <div id=settings-navbar>
        <v-spacer></v-spacer>
        <div @click="toggleWindow('settings')" class="settings-buttons" style="background-color: #5ac846"></div>
        <div @click="" class="settings-buttons" style="background-color: #f0c828"></div>
        <div @click="closeWindow('settings')" class="settings-buttons" style="background-color: #f0645a"></div>
      </div>

      <div id="settings-body">
        <h1>Settings</h1>
        <v-btn @click="toggleFly">Fly</v-btn>
        <v-btn @click="toggleZoom">Zoom</v-btn>
      </div>
    </div>

    <div id="terminal">
      <div id=terminal-navbar>
        <v-spacer></v-spacer>
        <div @click="toggleWindow('terminal')" class="terminal-buttons" style="background-color: #5ac846"></div>
        <div @click="" class="terminal-buttons" style="background-color: #f0c828"></div>
        <div @click="closeWindow('terminal')" class="terminal-buttons" style="background-color: #f0645a"></div>
      </div>

      <div id="terminal-body">
        <h1 class="typewriter">Hi!</h1>
        <h1 class="typewriter">I'm Lucas Ridge</h1>
        <h3 class="typewriter">{"occupation":"Web/Backend Developer"}</h3>
        <h3 class="typewriter">></h3>
      </div>
    </div>

    <v-footer v-if="ready" color="transparent">
      <div id="task-bar">
        <v-img v-for="item in apps" :key="item" class="task-icons" :src="item.image" :style="`height: ${item.height}; bottom: ${item.bottom}`" @click="taskBarClick(item.name)">
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
import {bringToFront, dragElement, openElements, resetElement} from "assets/ts/methods.ts";

export default {
  setup() {
  },
  data() {
    return {
      apps: [
        // {name: 'Kotlin', image: 'kotlin.svg', height: '2.6em', bottom: '2em'},
        // {name: 'Java', image: 'java.svg', height: '3em', bottom: '2.2em'},
        // {name: 'MySQL', image: 'mysql.svg', height: '3em', bottom: '1.2em'},
        {name: 'Terminal', image: 'terminal.svg', height: '3em', bottom: '1.4em'},
        {name: 'Settings', image: 'settings.svg', height: '3em', bottom: '1.6em'},
      ],
      backgrounds: ['kotlin.svg', 'java.svg', 'mysql.svg', 'terminal.svg'],
      ready: false,
      fly: false,
      zoom: false,
    }
  },
  methods: {
    closeWindow(app) {
      const element = document.getElementById(app);
      if (openElements.includes(element)) {
        delete openElements[openElements.indexOf(element)];
        element.style.animation = "close 0.1s linear forwards";
        setTimeout(() => {
          resetElement(element);
        }, 100);
      }
    },
    loadElements() {
      dragElement(document.getElementById("app1"));
      dragElement(document.getElementById("app2"));
      dragElement(document.getElementById("terminal"));
      dragElement(document.getElementById("settings"));

      openElements.push(document.getElementById('terminal'));
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
    this.ready = true;
  }
}
</script>
