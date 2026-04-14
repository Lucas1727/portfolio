export default defineAppConfig({
    ui: {
        toast: {
            slots: {
                root: 'bg-(--gnome-panel)',
                icon: 'size-6 text-(--gnome-text)!',
                title: 'text-(--gnome-text)'
            },
        }
    }
})