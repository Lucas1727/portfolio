import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({

    app: {
        head: {
            title: 'Lucas Ridge - Full-Stack Developer',
            link: [{rel: 'icon', type: 'image/png', href: ""}],
            meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1'}],
        },
    },

    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storageKey: 'nuxt-color-mode'
    },

    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        '~/assets/css/main.css'
    ],

    devtools: {enabled: false},

    modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@nuxt/icon'],

    routeRules: {},

    runtimeConfig: {
        public: {
            buildId: process.env.BUILD_ID,
            buildHash: process.env.BUILD_HASH,
        }
    },

    site: {
        defaultLocale: 'en',
    },

    ssr: false,

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})