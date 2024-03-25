import './MessageList.scss'
import MessageList from './MessageList.hbs?raw'
import Block from '../../tools/Block'

export class MessageListBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(MessageList, this.props, this.props.className)
    }
}
