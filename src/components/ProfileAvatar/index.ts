import './ProfileAvatar.scss'
import ProfileAvatar from './ProfileAvatar.hbs?raw'
import Block from '../../tools/Block'

export class ProfileAvatarBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(ProfileAvatar, this.props, this.props.className)
    }
}
