import './ChatArea.scss'
import ChatArea from './ChatArea.hbs?raw'
import Block from '../../tools/Block'
import { ChatHeaderBlock } from '../ChatHeader'
import { MessageFieldBlock } from '../MessageField'
import { MessageListBlock } from '../MessageList'

export class ChatAreaBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        this.children = {
            ChatHeader: new ChatHeaderBlock({
                name: 'Никита',
                avatar: '',
            }),
            MessageList: new MessageListBlock({}),
            MessageField: new MessageFieldBlock({}),
        }
        return this.compile(ChatArea, this.props, this.props.className)
    }
}
