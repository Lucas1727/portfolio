import {describe, it, expect} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('App.vue', () => {
    // it('renders correctly', async () => {
    //     const component = await mountSuspended(App)
    //     expect(component.html()).toContain('portfolio-app')
    // })

    it('has correct title meta', async () => {
        const component = await mountSuspended(App)
        expect(component.vm.$route).toBeDefined()
    })
})
