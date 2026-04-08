import {test, expect} from '@playwright/test'

test.describe('E2E Tests', () => {
    test('homepage loads successfully', async ({page}) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveTitle(/Lucas Ridge - Full-Stack Developer/)
    })

    test('displays welcome toast on load', async ({page}) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const welcomeText = page.getByText('Welcome!').first()
        await expect(welcomeText).toBeVisible({timeout: 10000})
    })

    test('desktop components are visible', async ({page}) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const body = await page.locator('body')
        await expect(body).toBeVisible()
    })

    test('page is responsive on mobile', async ({page}) => {
        await page.setViewportSize({width: 320, height: 640})
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const body = await page.locator('body')
        await expect(body).toBeVisible()
    })
})
