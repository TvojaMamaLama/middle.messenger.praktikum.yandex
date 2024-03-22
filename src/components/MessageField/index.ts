import './MessageField.scss'
import MessageField from './MessageField.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../LocalButton'

export class MessageFieldBlock extends Block {
    constructor(props: { link?: string }) {
        super('div', { ...props })
    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
        if (e.target) {
            console.log(e.target)
        }
    }

    render() {
        this.children = {
            ActionMenuButton: new ButtonBlock({
                icon: 'pin',
                className: 'button button__primary button__circle',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
            SendButton: new ButtonBlock({
                icon: 'arrow-right',
                width: '28',
                height: '28',
                className: 'button button__primary button__circle',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
        }

        return this.compile(MessageField, this.props)
    }
}
