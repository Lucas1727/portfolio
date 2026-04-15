import {test, expect} from '@playwright/test'

test.describe('E2E Tests', () => {

    test.setTimeout(300_000)

    test.beforeEach(async ({page}) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const popup = page.locator('.window-base').first()
        await expect(popup).toBeVisible()

        await popup.getByRole('button', {name: 'Close'}).click()
        await expect(popup).not.toBeVisible()
    })

    test('homepage loads successfully', async ({page}) => {
        await expect(page).toHaveTitle(/Lucas Ridge - Full-Stack Developer/)
    })

    test('displays welcome toast on load', async ({page}) => {
        const welcomeText = page.getByText('Welcome!').first()
        await expect(welcomeText).toBeVisible({timeout: 10000})
    })

    test('desktop components are visible', async ({page}) => {
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

    test('window can be opened and closed', async ({page}) => {
        const aboutIcon = page.getByRole('button', {name: 'about'}).first()
        await aboutIcon.dblclick()

        const window = page.locator('.window-base').first()
        await expect(window).toBeVisible()

        const closeButton = window.getByRole('button', {name: 'Close'})
        await closeButton.click()

        await expect(window).not.toBeVisible()
    })

    test('window can be minimized', async ({page}) => {
        const aboutIcon = page.getByRole('button', {name: 'about'}).first()
        await aboutIcon.dblclick()

        const window = page.locator('.window-base').first()
        await expect(window).toBeVisible()

        const minimizeButton = window.getByRole('button', {name: 'Minimize'})
        await minimizeButton.click()

        await expect(window).not.toBeVisible()
    })

    test('window can be maximized and restored', async ({page}) => {
        const aboutIcon = page.getByRole('button', {name: 'about'}).first()
        await aboutIcon.dblclick()

        const window = page.locator('.window-base').first()
        await expect(window).toBeVisible()

        const initialBox = await window.boundingBox()
        expect(initialBox).not.toBeNull()

        const maximizeButton = window.getByRole('button', {name: 'Maximize'})
        await maximizeButton.click()

        await expect(window).toHaveClass(/maximized/)

        await maximizeButton.click()

        await expect(window).not.toHaveClass(/maximized/)
    })

    test('weblinks work in About window', async ({page}) => {
        const aboutIcon = page.getByRole('button', {name: 'about'}).first()
        await aboutIcon.dblclick()

        const window = page.locator('.window-base').first()
        await expect(window).toBeVisible()

        const githubLink = window.getByRole('link', {name: /github/i})
        await expect(githubLink).toBeVisible()
        await expect(githubLink).toHaveAttribute('href', 'https://github.com/Lucas1727')
        await expect(githubLink).toHaveAttribute('target', '_blank')

        const linkedinLink = window.getByRole('link', {name: /linkedin/i})
        await expect(linkedinLink).toBeVisible()
        await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/lucas-ridge-08964942')
        await expect(linkedinLink).toHaveAttribute('target', '_blank')

        const emailLink = window.getByRole('link', {name: /email/i})
        await expect(emailLink).toBeVisible()
        await expect(emailLink).toHaveAttribute('href', 'mailto:lucasridge1727@gmail.com')
        await expect(emailLink).toHaveAttribute('target', '_blank')

        const cvLink = window.getByRole('link', {name: /cv/i})
        await expect(cvLink).toBeVisible()
        await expect(cvLink).toHaveAttribute('href', 'https://docs.google.com/document/d/e/2PACX-1vTiNF5gQ9DOkbNGuza8HH6rEN-lO4MsLg5K8x8rwFWx9wKzcDxjUHnIpxuoVpEpaAzDNPMxfx-ZpW-2/pub')
        await expect(cvLink).toHaveAttribute('target', '_blank')

        const vtimeLink = window.getByRole('link', {name: /vTime Website/i})
        await expect(vtimeLink).toBeVisible()
        await expect(vtimeLink).toHaveAttribute('href', 'https://vtime.net')
        await expect(vtimeLink).toHaveAttribute('target', '_blank')
    })
})
