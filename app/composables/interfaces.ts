export interface AppDefinition {
    id: string
    name: string
    icon: string
    component: string
    defaultWidth: number
    defaultHeight: number
    minWidth?: number
    minHeight?: number
    description: string
}

export interface AppWindow {
    id: string
    appId: string
    title: string
    icon: string
    component: string
    x: number
    y: number
    width: number
    height: number
    minWidth: number
    minHeight: number
    zIndex: number
    isMinimized: boolean
    isMaximized: boolean
    isFocused: boolean
    prevBounds?: { x: number; y: number; width: number; height: number }
}