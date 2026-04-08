import {defineVitestConfig} from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                domEnvironment: 'happy-dom',
                overrides: {},
            }
        },
        exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.{idea,git,cache,output,temp}/**']
    }
})
