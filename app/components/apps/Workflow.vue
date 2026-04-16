<template>
  <div class="flex flex-col overflow-y-auto">

    <div class="flex flex-col gap-2 m-2">
      <h1 class="text-2xl font-bold text-center">Website Creation</h1>
    </div>

    <div class="flex flex-col gap-4 m-2">
      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="m-2 text-xl font-semibold">Introduction</h2>
        <p class="mx-2">Here is a quick little guide to the creation and deployment workflow of how I made this portfolio page using NUXT.</p>
        <p class="mx-2">The inspiration for this webpage was to base it on the gnome Linux desktop environment.
          Instead of navigating several webpages like an ordinary website, I thought why not show information using desktop windows that you can open, close and resize.
          I preferred this over a traditional website as it felt more engaging and fun to create, while also showing off some of my frontend skills in a unique way.
          In addition to this I can easily add more content or features by adding a new app to the desktop.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4 m-2">
      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="m-2 text-xl font-semibold">Initialization</h2>
        <p class="mx-2"></p>
        <p class="mx-2">Create a new Nuxt 4 project and open the folder</p>
        <CodeBlock lang="bash" code="npx nuxi@latest init portfolio"/>

        <p class="mx-2 mt-4">Install Dependencies (NUXT UI and Tailwind CSS)</p>
        <CodeBlock lang="bash" code="npm install @nuxt/ui tailwindcss"/>

        <p class="mx-2 mt-4">Run the webpage in development mode</p>
        <CodeBlock lang="bash" code="npm run dev"/>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="m-2 text-xl font-semibold">Development</h2>
        <p class="mx-2">Create some Vue components, global styling and typescript composables to flesh out the webpage and give it some content.</p>
        <p class="mx-2">Feel free to browse some of the files for this project below or view the source code on GitHub.
          <UButton variant="ghost" class="p-0 size-2 text-(--gnome-text-dim) hover:text-(--gnome-text) bg-transparent hover:bg-transparent" icon="mdi:github" @click="openGitHub"/>
        </p>

        <UTree :items="fileTreeItems" class="rounded-xl border border-(--gnome-border) p-2"/>

        <p class="mx-2">For this specific project new content is added to the webpage by creating a Vue component in
          <CodeSnippet code="~/app/components/apps"></CodeSnippet>
          and then adding it to the applications composable in
          <CodeSnippet code="~/app/composables/applications.ts"></CodeSnippet>
          to make a new desktop application that will show content in a window.
        </p>

        <p class="mx-2">For styling I use Tailwind CSS and the NUXT UI component library, which is built on top of Tailwind. I also use some custom CSS variables for colors and fonts to make it easier to maintain a consistent style across
          the webpage.</p>
        <p class="mx-2">The functionality of the windows is handled by the
          <CodeSnippet code="~/app/composables/windowManager.ts"></CodeSnippet>
          which keeps track of the different app windows that are open and their state (minimized, maximized, focused) and provides functions to change this state.
          The dock component then uses this composable to show the open applications and allow the user to interact with them.
        </p>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="m-2 text-xl font-semibold">Testing</h2>
        <p class="mx-2">To test my webpage for deployment I use vitest and playwright from NUXT test-utils.</p>
        <p class="mx-2">Install dependencies for testing (NUXT test-utils, vitest, happy-dom and playwright)</p>
        <CodeBlock lang="bash" code="npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core"/>

        <p class="mx-2 mt-4">Create some test files in the tests directory and make some unit tests for checking webpage functionality.</p>
        <p class="mx-2">
          Below is a snippet from
          <CodeSnippet code="~/tests/e2e/basic.spec.ts"/>
          with tests created using <b>Playwright</b>.
        </p>
        <p class="mx-2">
          The below test gets the desktop button for the given app 'about' and then double clicks it.
          It checks the window opens and is visible, then locates the close button before checking that the window closes and it not visible anymore.</p>
        <CodeBlock lang="TypeScript" :code="test"/>
      </div>

      <div class="flex flex-col gap-2 p-2 rounded-xl border border-(--gnome-border)">
        <h2 class="m-2 text-xl font-semibold">Deployment</h2>
        <p class="mx-2">The deployment of this portfolio is automated using GitHub Actions, the NUXT documentation gives an easy to use template for this type of deployment.
          The actions functionality comes from a YAML file created at
          <CodeSnippet code="~/.github/workflows/deploy.yml"></CodeSnippet>
          which has parameters for the different jobs and steps in the deployment process.
        </p>
        <p class="mx-2">The process consists of three main jobs: testing, building, and deploying to GitHub Pages.
          The workflow triggers on pushes to the master branch or can be manually triggered via workflow dispatch.</p>
        <p class="mx-2">Test - All tests are run using Vitest and Playwright to ensure everything is working correctly on the website.</p>
        <p class="mx-2">Build - If tests pass, the build job creates a production build using Nuxt with the GitHub Pages preset in an Ubuntu environment.</p>
        <p class="mx-2">Deploy - Finally, the deploy job uploads the built site to GitHub Pages.</p>
        <p class="mx-2">That's it! The website is live, hosted by GitHub with a cloudflare DNS record pointing to GitHub so it can be accessed via a domain!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "~/components/CodeBlock.vue";
import CodeSnippet from "~/components/CodeSnippet.vue";
import {fileTreeItems} from "~/composables/fileTree";

defineProps<{ windowId: string }>()

const baseGitHubUrl = 'https://github.com/Lucas1727/portfolio'

const openGitHub = () => {
  window.open(baseGitHubUrl, '_blank')?.focus()
}

const test =
    "import {test, expect} from '@playwright/test'\n" +
    "\n" +
    "test.describe('E2E Tests', () => {\n" +
    "  test('window can be opened and closed', async ({page}) => {\n" +
    "    const aboutIcon = page.getByRole('button', {name: 'about'}).first()\n" +
    "    await aboutIcon.dblclick()\n" +
    "\n" +
    "    const window = page.locator('.window-base').first()\n" +
    "    await expect(window).toBeVisible()\n" +
    "\n" +
    "    const closeButton = window.getByRole('button', {name: 'Close'})\n" +
    "    await closeButton.click()\n" +
    "\n" +
    "    await expect(window).not.toBeVisible()\n" +
    "  })\n" +
    "})"
</script>

<style scoped>
p {
  color: var(--gnome-text-dim);
}
</style>
