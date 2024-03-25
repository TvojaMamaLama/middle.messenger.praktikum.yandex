import './ChatItem.scss'
import ChatItem from './ChatItem.hbs?raw'
import Block from '../../tools/Block'
import { AvatarBlock } from '../Avatar'

export class ChatItemBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        this.children = {
            Avatar: new AvatarBlock({
                avatar: '',
            }),
        }
        return this.compile(ChatItem, this.props, this.props.className)
    }
}
