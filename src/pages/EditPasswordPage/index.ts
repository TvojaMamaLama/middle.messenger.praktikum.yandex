import './EditPasswordPage.scss'
import EditPasswordPageBlock from './EditPasswordPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { UserDataFieldBlock } from '../../components/UserDataField'
import { ProfileAvatarBlock } from '../../components/ProfileAvatar'
import { ProfileSidebarBlock } from '../../components/ProfileSidebar'

export class EditPasswordPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            old_password: '',
            password: '',
            repeat_password: '',
        }
    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
        if (e.target) {
            console.log(e.target)
        }
    }

    render() {
        this.children = {
            ProfileSidebar: new ProfileSidebarBlock({}),
            ProfileAvatar: new ProfileAvatarBlock({
                name: 'Никита',
            }),
            OldPasswordUserDataField: new UserDataFieldBlock({
                label: 'Старый пароль',
                name: 'oldPassword',
                type: 'password',
                value: 'password',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            PasswordUserDataField: new UserDataFieldBlock({
                label: 'Новый пароль',
                name: 'newPassword',
                type: 'password',
                value: 'password1',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            RepeatPasswordUserDataField: new UserDataFieldBlock({
                label: 'Повторите новый пароль',
                name: 'newPassword',
                type: 'password',
                value: 'password1',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            SaveButton: new ButtonBlock({
                text: 'Сохранить',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
        }

        return this.compile(EditPasswordPageBlock, this.props)
    }
}
