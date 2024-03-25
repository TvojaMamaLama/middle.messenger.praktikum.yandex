import Handlebars from 'handlebars'
import { v4 as uuidv4 } from 'uuid'

import EventBus from './EventBus'

type Props = { [key: string]: unknown }

type MetaProps = {
    tag: string
    props: Props
}

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const

    _meta: MetaProps

    children: Record<string, Block>
    props: Props
    state: Props
    eventBus: () => EventBus

    _element: HTMLElement | null = null
    _id: string = uuidv4()

    constructor(tag: string, propsWithChildren: Props) {
        const eventBus = new EventBus()

        const { children, props } = this._getChildren(propsWithChildren)

        this.props = this._makePropsProxy({ ...props })
        this.children = children
        this._meta = { tag, props }

        this.eventBus = () => eventBus
        this._registerEvents(eventBus)

        this.state = {}
        eventBus.emit(Block.EVENTS.INIT)
    }

    _getChildren(propsWithChildren: Props) {
        const { children, props } = Object.entries(propsWithChildren).reduce(
            (acc, [key, value]) => {
                if (value instanceof Block) {
                    acc.children[key as string] = value
                } else {
                    acc.props[key] = value
                }
                return acc
            },
            { children: {} as typeof this.children, props: {} as Props }
        )

        return { children, props }
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    _createResources() {
        const { tag } = this._meta
        this._element = this._createDocumentElement(tag)
    }

    _init() {
        this._createResources()
        this.init()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        this.dispatchComponentDidMount()
    }

    init() {}

    _componentDidMount(): void {
        this.componentDidMount()
    }

    componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate(oldProps: Props, newProps: Props): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        return oldProps !== newProps
    }

    setProps(nextProps: Props): void {
        if (!nextProps) {
            return
        }
        const oldProps = { ...this.props }
        Object.assign(this.props, nextProps)
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props)
    }

    get element(): HTMLElement | null {
        return this._element
    }

    _render() {
        const block: unknown = this.render()
        this._removeEvents()
        if (this._element) {
            this._element.innerHTML = ''
            this._element.appendChild(block as Node)
            this._addEvents()
            this._addAttributes()
        }
    }

    setClassName(className?: string | unknown) {
        if (typeof className === 'string') {
            const classNames = (className as string).split(/\s+/)
            classNames.forEach((token) => {
                this._element?.classList.add(token)
            })
        }
    }

    protected compile(
        template: string,
        props: Props,
        className?: string | unknown
    ) {
        const propsAndStubs: Record<string, unknown> = { ...props }
        this.setClassName(className)
        const fragment = this._createDocumentElement(
            'template'
        ) as HTMLTemplateElement
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] =
                `<${child._meta.tag} data-id="${child._id}"></${child._meta.tag}>`
        })

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`
            )
            const el = child.getContent()

            if (stub && el) {
                stub.replaceWith(el)
            }
        })
        return fragment.content
    }

    render() {}

    getContent(): HTMLElement | null {
        return this.element
    }

    _makePropsProxy(props: Props) {
        return new Proxy(props, {
            get(target: Props, prop: string) {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, prop: string, value) => {
                if (target[prop as keyof Props] !== value) {
                    target[prop as keyof Props] = value
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU)
                }
                return true
            },
            deleteProperty: () => {
                throw new Error('нет доступа')
            },
        })
    }

    _createDocumentElement(tag: string): HTMLElement {
        const element = document.createElement(tag)
        element.setAttribute('data-id', this._id)

        return element
    }

    _addAttributes() {
        const { attr } = this.props
        if (attr && typeof attr === 'object') {
            Object.entries(attr).forEach(([key, value]) => {
                this._element?.setAttribute(key, value as string)
            })
        }
    }

    _addEvents(): void {
        const { events } = this.props

        if (events) {
            Object.entries(events).forEach(([eventName, callback]) => {
                this._element?.addEventListener(eventName, callback)
            })
        }
    }

    _removeEvents(): void {
        const { events } = this.props
        if (events) {
            Object.entries(events).forEach(([eventName, callback]) => {
                this._element?.removeEventListener(eventName, callback)
            })
        }
    }

    show() {
        this.getContent()!.style.display = 'block'
    }

    hide() {
        this.getContent()!.style.display = 'none'
    }
}

export default Block
