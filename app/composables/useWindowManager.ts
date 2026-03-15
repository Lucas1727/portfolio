const windows = ref<AppWindow[]>([])
const nextZIndex = ref(100)
const nextId = ref(1)

export function useWindowManager() {
    const focusedWindowId = computed(() => [...(windows.value as AppWindow[])].filter(w => !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null)

    function openWindow(app: Omit<AppWindow, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized' | 'isFocused'>) {
        const existing = (windows.value as AppWindow[]).find(w => w.appId === app.appId)
        const vw = window.innerWidth, vh = window.innerHeight - 40

        let mobile = app.width > vw

        if (mobile) {
            app.width = vw
            app.x = Math.floor((vw - app.width) / 2)
            app.y = Math.max(40, Math.floor((vh - app.width) / 2))
        }

        if (existing) {
            focusWindow(existing.id)
            if (existing.isMinimized) existing.isMinimized = false
            return existing.id
        }

        const id = `win-${nextId.value++}`;

        (windows.value as AppWindow[]).forEach(w => (w.isFocused = false))
        windows.value.push({...app, id, zIndex: nextZIndex.value++, isMinimized: false, isMaximized: false, isFocused: true} as AppWindow)

        if (mobile) toggleMaximize(id)

        return id
    }

    function closeWindow(id: string) {
        const idx = (windows.value as AppWindow[]).findIndex(w => w.id === id)

        if (idx !== -1) windows.value.splice(idx, 1)
    }

    function focusWindow(id: string) {
        (windows.value as AppWindow[]).forEach(w => (w.isFocused = w.id === id))

        const appWindow = (windows.value as AppWindow[]).find(w => w.id === id)

        if (appWindow) appWindow.zIndex = nextZIndex.value++
    }

    function minimizeWindow(id: string) {
        const appWindow = (windows.value as AppWindow[]).find(w => w.id === id)

        if (appWindow) {
            appWindow.isMinimized = true;
            appWindow.isFocused = false
        }
    }

    function maximizeWindow(id: string) {
        const appWindow = (windows.value as AppWindow[]).find(w => w.id === id)

        console.log(`Maximizing window ${id}`)

        if (appWindow) {
            appWindow.isMinimized = false;
            appWindow.isFocused = true
        }
    }

    function toggleMaximize(id: string) {
        const win = (windows.value as AppWindow[]).find(w => w.id === id)

        if (!win) return

        console.log(`Toggling maximize for window ${id}, currently maximized: ${win.isMaximized}`)

        if (win.isMaximized) {
            if (win.prevBounds) Object.assign(win, win.prevBounds)
            win.isMaximized = false
        } else {
            win.prevBounds = {x: win.x, y: win.y, width: win.width, height: win.height}
            Object.assign(win, {x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 120})
            win.isMaximized = true
        }
    }

    function updateWindowBounds(id: string, bounds: Partial<Pick<AppWindow, 'x' | 'y' | 'width' | 'height'>>) {
        const win = (windows.value as AppWindow[]).find(w => w.id === id)
        if (win) Object.assign(win, bounds)
    }

    return {
        windows: readonly(windows),
        focusedWindowId,
        openWindow,
        closeWindow,
        focusWindow,
        maximizeWindow,
        minimizeWindow,
        toggleMaximize,
        updateWindowBounds
    }
}
