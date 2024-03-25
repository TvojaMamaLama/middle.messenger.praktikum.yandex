import './InputField.scss'
import InputField from './InputField.hbs?raw'
import Block from '../../tools/Block'

export class InputFieldBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(InputField, this.props, this.props.className)
    }
}
