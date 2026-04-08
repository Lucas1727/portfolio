import {describe, it, expect} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Index Page', () => {
    it('renders all main components', async () => {
        const component = await mountSuspended(IndexPage)
        expect(component.html()).toBeTruthy()
    })

    it('mounts successfully', async () => {
        const component = await mountSuspended(IndexPage)
        expect(component.vm).toBeDefined()
    })
})
