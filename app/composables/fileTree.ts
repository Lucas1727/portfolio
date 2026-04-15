import type {TreeItem} from "@nuxt/ui";

const baseGitHubUrl = 'https://github.com/Lucas1727/portfolio/blob/master'

export const fileTreeItems = ref<TreeItem[]>([
    {
        label: 'app/',
        defaultExpanded: true,
        children: [
            {
                label: 'assets/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'css/',
                        defaultExpanded: true,
                        children: [
                            {
                                label: 'main.css',
                                icon: 'i-vscode-icons-file-type-css',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/assets/css/main.css`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'terminal.css',
                                icon: 'i-vscode-icons-file-type-css',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/assets/css/terminal.css`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'window.css',
                                icon: 'i-vscode-icons-file-type-css',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/assets/css/window.css`, '_blank')?.focus()
                                }
                            },
                        ]
                    },
                ]
            },
            {
                label: 'components/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'CodeBlock.vue',
                        icon: 'i-vscode-icons-file-type-vue',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/components/CodeBlock.vue`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'CodeSnippet.vue',
                        icon: 'i-vscode-icons-file-type-vue',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/components/CodeSnippet.vue`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'apps/',
                        defaultExpanded: true,
                        children: [
                            {
                                label: 'About.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/About.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Blah.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/Blah.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Experience.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/Experience.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Skills.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/Skills.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Terminal.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/Terminal.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Workflow.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/apps/Workflow.vue`, '_blank')?.focus()
                                }
                            },
                        ]
                    },
                    {
                        label: 'desktop/',
                        defaultExpanded: true,
                        children: [
                            {
                                label: 'Background.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/Background.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Dock.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/Dock.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Icons.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/Icons.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'TopBar.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/TopBar.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'Window.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/Window.vue`, '_blank')?.focus()
                                }
                            },
                            {
                                label: 'WindowLayer.vue',
                                icon: 'i-vscode-icons-file-type-vue',
                                onSelect() {
                                    window.open(`${baseGitHubUrl}/app/components/desktop/WindowLayer.vue`, '_blank')?.focus()
                                }
                            }
                        ]
                    }
                ]
            },
            {
                label: 'composables/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'applications.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/composables/applications.ts`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'fileTree.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/composables/fileTree.ts`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'interfaces.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/composables/interfaces.ts`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'methods.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/composables/methods.ts`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'windowManager.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/composables/windowManager.ts`, '_blank')?.focus()
                        }
                    }
                ]
            },
            {
                label: 'pages/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'index.vue',
                        icon: 'i-vscode-icons-file-type-vue',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/app/pages/index.vue`, '_blank')?.focus()
                        }
                    }
                ]
            },
            {
                label: 'app.vue',
                icon: 'i-vscode-icons-file-type-vue',
                onSelect() {
                    window.open(`${baseGitHubUrl}/app/app.vue`, '_blank')?.focus()
                }
            },
            {
                label: 'app.config.ts',
                icon: 'i-vscode-icons-file-type-typescript',
                onSelect() {
                    window.open(`${baseGitHubUrl}/app/app.config.ts`, '_blank')?.focus()
                }
            },
        ]
    },
    {
        label: 'server/',
        defaultExpanded: false,
        children: [
            {
                label: 'tsconfig.json',
                icon: 'i-vscode-icons-file-type-json',
                onSelect() {
                    window.open(`${baseGitHubUrl}/server/tsconfig.json`, '_blank')?.focus()
                }
            }
        ]
    },
    {
        label: 'test/',
        defaultExpanded: false,
        children: [
            {
                label: 'e2e/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'basic.spec.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/test/e2e/basic.spec.ts`, '_blank')?.focus()
                        }
                    }
                ]
            },
            {
                label: 'unit/',
                defaultExpanded: false,
                children: [
                    {
                        label: 'app.test.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/test/unit/app.test.ts`, '_blank')?.focus()
                        }
                    },
                    {
                        label: 'index.test.ts',
                        icon: 'i-vscode-icons-file-type-typescript',
                        onSelect() {
                            window.open(`${baseGitHubUrl}/test/unit/index.test.ts`, '_blank')?.focus()
                        }
                    }
                ]
            }
        ]
    },
    {
        label: '.nuxtrc',
        icon: 'i-vscode-icons-file-type-text',
        onSelect() {
            window.open(`${baseGitHubUrl}/.nuxtrc`, '_blank')?.focus()
        }
    },
    {
        label: 'nuxt.config.ts',
        icon: 'i-vscode-icons-file-type-typescript',
        onSelect() {
            window.open(`${baseGitHubUrl}/nuxt.config.ts`, '_blank')?.focus()
        }
    },
    {
        label: 'package.json',
        icon: 'i-vscode-icons-file-type-json',
        onSelect() {
            window.open(`${baseGitHubUrl}/package.json`, '_blank')?.focus()
        }
    },
    {
        label: 'playwright.config.ts',
        icon: 'i-vscode-icons-file-type-typescript',
        onSelect() {
            window.open(`${baseGitHubUrl}/playwright.config.ts`, '_blank')?.focus()
        }
    },
    {
        label: 'README.md',
        icon: 'i-vscode-icons-file-type-markdown',
        onSelect() {
            window.open(`${baseGitHubUrl}/README.md`, '_blank')?.focus()
        }
    },
    {
        label: 'tsconfig.json',
        icon: 'i-vscode-icons-file-type-json',
        onSelect() {
            window.open(`${baseGitHubUrl}/tsconfig.json`, '_blank')?.focus()
        }
    },
    {
        label: 'vitest.config.ts',
        icon: 'i-vscode-icons-file-type-typescript',
        onSelect() {
            window.open(`${baseGitHubUrl}/vitest.config.ts`, '_blank')?.focus()
        }
    }
])