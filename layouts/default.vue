<template>
  <v-app>
    <!--    <v-app-bar id="v-app-bar" density="compact" color="transparent" :elevation="10"></v-app-bar>-->

    <v-toolbar id="navbar" density="compact" absolute>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        {{ date }}
      </v-toolbar-title>

      <template v-slot:append>
        <v-menu location="bottom" transition="slide-y-transition">
          <template v-slot:activator="{ props: menu }">
            <v-btn icon="mdi-wifi" @click="wifi" v-bind="menu"></v-btn>
          </template>

          <v-card id="wifi-window" class="popout-window">
            Ping: {{ ping }}ms
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props: tooltip }">
                <v-icon v-bind="tooltip">mdi-signal</v-icon>
              </template>
              <span>{{ host }}</span>
            </v-tooltip>
          </v-card>
        </v-menu>

        <v-menu location="bottom" transition="slide-y-transition">
          <template v-slot:activator="{ props: menu }">
            <v-btn icon="mdi-account" v-bind="menu"></v-btn>
          </template>

          <v-card id="account-window" class="popout-window">
            Build: {{ config.public.buildHash }}
          </v-card>
        </v-menu>

        <v-btn icon="mdi-power" @click="shutdown"></v-btn>
      </template>
    </v-toolbar>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<script>
import {getDateString, urlFetch} from "~/assets/ts/methods.ts";

export default {
  setup() {
    const config = useRuntimeConfig()
    
    return {
      config
    }
  },
  data() {
    return {
      date: '',
      host: 'portfolio.faenor.co.uk',
      ping: '',
      showWifi: false,
    }
  },
  methods: {
    getDate() {
      return getDateString(Date.now(), 'DD MMMM HH:mm')
    },
    async pingHost(host) {
      const start = new Date().getTime()

      return new Promise((resolve, reject) => {
        urlFetch('GET', `https://${host}`).then(() => {
          resolve(new Date().getTime() - start)
        }).catch(() => {
          reject(999);
        })
      })
    },
    shutdown() {
      window.close();
    },
    wifi() {
      if (this.showWifi) {
        this.showWifi = false
      } else {
        this.pingHost(this.host).then((ping) => {
          this.ping = ping
        }).catch(() => {
          this.ping = 'ERR'
        })
        this.showWifi = true
      }
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
