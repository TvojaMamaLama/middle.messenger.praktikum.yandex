import './ChatHeader.scss'
import ChatHeader from './ChatHeader.hbs?raw'
import Block from '../../tools/Block'
import { AvatarBlock } from '../Avatar'

export class ChatHeaderBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        this.props.children = {
            Avatar: new AvatarBlock({
                size: '34',
            }),
        }

        return this.compile(ChatHeader, this.props, this.props.className)
    }
}
