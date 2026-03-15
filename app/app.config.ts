export default defineAppConfig({
    ui: {
        toast: {
            slots: {
                root: 'bg-(--gnome-panel) p-4!',
                icon: 'size-6 text-(--gnome-text)!',
                title: 'text-(--gnome-text)'
            },
        }
    }
})