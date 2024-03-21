import './Avatar.scss'
import Avatar from './Avatar.hbs?raw'
import Block from '../../tools/Block'

export class AvatarBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(Avatar, this.props, this.props.className)
    }
}
