import './ChatPage.scss'
import ChatPageBlock from './ChatPage.hbs?raw'
import Block from '../../tools/Block'
import { SidebarBlock } from '../../components/Sidebar'
import { ChatAreaBlock } from '../../components/ChatArea'

export class ChatPage extends Block {
    constructor(props: { name?: string }) {
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
            Sidebar: new SidebarBlock({}),
            ChatArea: new ChatAreaBlock({}),
        }

        return this.compile(ChatPageBlock, this.props)
    }
}
