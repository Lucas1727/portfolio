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

    <div id=terminal-bar>
      <v-spacer></v-spacer>
      <div class="terminal-buttons"></div>
      <div class="terminal-buttons"></div>
      <div class="terminal-buttons"></div>
    </div>

    <div id="terminal-window">
      <h1 class="typewriter">Hi!</h1>
      <h1 class="typewriter">I'm Lucas Ridge</h1>
      <h3 class="typewriter">{"occupation":"Web/Backend Developer"}</h3>
      <h3 class="typewriter">></h3>
    </div>

    <!--    <h1>Page 2</h1>-->

    <v-footer color="transparent">
      <div id="task-bar">
        <v-img v-for="item in apps" :key="item" class="task-icons" :src="item.image" @click="console.log(item.name)">
          <v-tooltip activator="parent" location="bottom" open-delay="500">{{ item.name }}</v-tooltip>
        </v-img>
      </div>
    </v-footer>
  </v-container>
</template>

<script>

export default {
  setup() {
  },
  data() {
    return {
      apps: [
        {name: 'Kotlin', image: 'kotlin.svg'},
        {name: 'Java', image: 'java.svg'},
        {name: 'MySQL', image: 'mysql.svg'},
      ]
    }
  },
  mounted() {
  },
}
</script>
