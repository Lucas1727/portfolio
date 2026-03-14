import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({

    app: {
        head: {
            title: 'Lucas Ridge - Full-Stack Developer',
            link: [
                {rel: 'icon', type: 'image/png', href: ""},
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'}
            ],
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

    future: {compatibilityVersion: 4},

    modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@nuxt/icon'],

    routeRules: {},

    runtimeConfig: {
        public: {
            buildId: process.env.BUILD_ID,
            buildHash: process.env.BUILD_HASH,
        }
    },

    schemaOrg: {
        enabled: false
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