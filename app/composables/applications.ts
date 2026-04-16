export const APP_REGISTRY: AppDefinition[] = [
    {
        id: 'about',
        name: 'About Me',
        icon: 'fluent-color:person-48',
        component: 'AboutApp',
        defaultWidth: 960,
        defaultHeight: 640,
        minWidth: 480,
        minHeight: 360,
        description: 'Who I am',
    },
    {
        id: 'experience',
        name: 'Experience',
        icon: 'fluent-emoji-flat:briefcase',
        component: 'ExperienceApp',
        defaultWidth: 720,
        defaultHeight: 480,
        minWidth: 480,
        minHeight: 360,
        description: 'Experience in the industry',
    },
    {
        id: 'skills',
        name: 'Skills',
        icon: 'glyphs-poly:bolt-1',
        component: 'SkillsApp',
        defaultWidth: 720,
        defaultHeight: 480,
        minWidth: 480,
        minHeight: 360,
        description: 'Tech skills & experience',
    },
    {
        id: 'terminal',
        name: 'Terminal',
        icon: 'gg:terminal',
        component: 'TerminalApp',
        defaultWidth: 720,
        defaultHeight: 480,
        minWidth: 480,
        minHeight: 360,
        description: 'Interactive terminal',
    },
    {
        id: 'workflow',
        name: 'Workflow',
        icon: 'clarity:flow-chart-line',
        component: 'WorkflowApp',
        defaultWidth: 960,
        defaultHeight: 640,
        minWidth: 480,
        minHeight: 360,
        description: 'Workflow',
    },
]

export function applications() {
    function getApp(id: string) {
        return APP_REGISTRY.find(a => a.id === id)
    }

    return {apps: APP_REGISTRY, getApp}
}
