import './ProfileSidebar.scss'
import ProfileSidebar from './ProfileSidebar.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../LocalButton'

export class ProfileSidebarBlock extends Block {
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
            ExitButton: new ButtonBlock({
                icon: 'arrow-left',
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

        return this.compile(ProfileSidebar, this.props)
    }
}
