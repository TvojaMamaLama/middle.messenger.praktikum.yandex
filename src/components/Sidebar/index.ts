import './Sidebar.scss'
import Sidebar from './Sidebar.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../LocalButton'
import { SearchPanelBlock } from '../SearchPanel'
import { ChatItemBlock } from '../ChatItem'

export class SidebarBlock extends Block {
    constructor(props: { link?: string }) {
        super('div', { ...props })
    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
        if (e.target) {
            console.log(e.target)
        }
    }

    render() {
        this.children = {
            ProfileButton: new ButtonBlock({
                text: 'Профиль',
                icon: 'arrow-right',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
            SearchPanel: new SearchPanelBlock({
                name: 'Поиск',
                value: '',
                placeholder: 'Поиск',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            ChatItem: new ChatItemBlock({
                name: 'Андрей',
                message: 'Привет Привет Привет',
                current: false,
                unread: 2,
                time: 'ср',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
        }

        return this.compile(Sidebar, this.props)
    }
}
