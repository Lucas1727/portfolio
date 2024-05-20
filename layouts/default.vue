<template>
  <v-app>
    <v-app-bar id="v-app-bar" density="compact" :elevation="10">

      <v-spacer></v-spacer>
      <v-app-bar-title>{{ date }}</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-wifi"></v-btn>
        <v-btn icon="mdi-volume-high"></v-btn>
        <v-btn icon="mdi-power"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<script>
import {getDateString} from "~/assets/ts/methods.ts";

export default {
  setup() {

    return {}
  },
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      return getDateString(Date.now(), 'DD MMMM HH:mm')
    }
  },
  created() {
    this.date = this.getDate()
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = this.getDate()
    }, 10000)
  },
}
</script>

<style src="~/assets/scss/default.scss"/>
