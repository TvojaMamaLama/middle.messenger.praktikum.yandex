import './UserDataField.scss'
import UserDataField from './UserDataField.hbs?raw'
import Block from '../../tools/Block'

export class UserDataFieldBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(UserDataField, this.props, this.props.className)
    }
}
