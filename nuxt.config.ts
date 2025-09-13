export default defineNuxtConfig({

    app: {
        head: {
            link: [{rel: 'icon', type: 'image/png', href: ""}]
        },
    },

    build: {
        transpile: [
            'vuetify',
        ],
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
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '~/assets/scss/global.scss'
    ],

    devtools: {enabled: false},

    modules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss'],

    routeRules: {},

    runtimeConfig: {
        public: {}
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
