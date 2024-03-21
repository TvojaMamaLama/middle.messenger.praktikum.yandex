export interface Callback {
    (...args: Record<string, unknown>[]): void
}

export default class EventBus {
    private listeners: Record<string, Callback[]>
    constructor() {
        this.listeners = {}
    }

    on(eventName: string, callback: Callback): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = []
        }

        this.listeners[eventName].push(callback)
    }

    off(eventName: string, callback: Callback): void {
        if (!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`)
        }

        this.listeners[eventName] = this.listeners[eventName].filter(
            (listener) => listener !== callback
        )
    }

    emit(eventName: string, ...args: Record<string, unknown>[]): void {
        if (!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`)
        }

        this.listeners[eventName].forEach((listener) => {
            listener(...args)
        })
    }
}
