import './LocalButton.scss'
import LocalButton from './LocalButton.hbs?raw'
import Block from '../../tools/Block'

export class ButtonBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('button', props)
    }
    render() {
        return this.compile(LocalButton, this.props, this.props.className)
    }
}
