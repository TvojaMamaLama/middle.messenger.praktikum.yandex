import './ErrorPage.scss'
import NotFoundPageBlock from './NotFoundPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'

export class NotFoundPage extends Block {
    constructor(props: { name?: string }) {
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
            BackButton: new ButtonBlock({
                text: 'Назад к чатам',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
        }

        return this.compile(NotFoundPageBlock, this.props)
    }
}
