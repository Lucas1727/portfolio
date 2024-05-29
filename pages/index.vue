<template>
  <v-container fluid id="background">
    <!--    <v-sheet style="height: 100vh"></v-sheet>-->

    <!--    <div id="brackets"></div>-->
    <!--    <div id="brackets"></div>-->
    <!--    <div id="brackets"></div>-->
    <!--    <div id="brackets"></div>-->
    <!--    <div id="brackets"></div>-->
    <!--    <div id="brackets"></div>-->
    <!--    <v-icon id="icon">mdi-help</v-icon>-->

    <!--    <svg viewBox="0 0 1280 300">-->
    <!--      <text x="50%" y="50%" dy=".35em" text-anchor="middle">#</text>-->
    <!--    </svg>-->

    <div id="app1" class="app" style="top: 8vh; calc(5vw - 6em);"></div>
    <div id="app2" class="app" style="top: 20vh; calc(5vw - 6em);"></div>

    <div id="terminal">
      <div id=terminal-navbar>
        <v-spacer></v-spacer>
        <div class="terminal-buttons"></div>
        <div class="terminal-buttons"></div>
        <div class="terminal-buttons"></div>
      </div>

      <div id="terminal-body">
        <h1 class="typewriter">Hi!</h1>
        <h1 class="typewriter">I'm Lucas Ridge</h1>
        <h3 class="typewriter">{"occupation":"Web/Backend Developer"}</h3>
        <h3 class="typewriter">></h3>
      </div>
    </div>

    <v-footer color="transparent">
      <div id="task-bar">
        <v-img v-for="item in apps" :key="item" class="task-icons" :src="item.image" :style="`height: ${item.height}; bottom: ${item.bottom}`" @click="console.log(item.name)">
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
import {dragElement} from "assets/ts/methods.ts";

export default {
  setup() {
  },
  data() {
    return {
      apps: [
        {name: 'Kotlin', image: 'kotlin.svg', height: '2.6em', bottom: '2em'},
        {name: 'Java', image: 'java.svg', height: '3em', bottom: '2.2em'},
        {name: 'MySQL', image: 'mysql.svg', height: '3em', bottom: '1.2em'},
      ]
    }
  },
  methods: {},
  mounted() {
    dragElement(document.getElementById("app1"));
    dragElement(document.getElementById("app2"));
    dragElement(document.getElementById("terminal"));
  },
}
</script>
