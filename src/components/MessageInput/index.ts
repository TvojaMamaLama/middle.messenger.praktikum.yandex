import './MessageInput.scss'
import MessageInput from './MessageInput.hbs?raw'
import Block from '../../tools/Block'

export class MessageInputBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', { ...props })
    }
    render() {
        return this.compile(MessageInput, this.props)
    }
}
