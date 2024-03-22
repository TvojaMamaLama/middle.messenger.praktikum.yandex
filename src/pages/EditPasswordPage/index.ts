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
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        }
    }

    onChange = (event: Event) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        if (target) {
            const { name, value } = target
            this.state[name] = value
        }
    }

    validateFieldList(): boolean {
        // вынести
        const isValid: boolean = true
        return isValid
    }

    onSubmit = (e: Event) => {
        e.preventDefault()
        if (e.target) {
            if (this.validateFieldList()) {
                console.log('Смена пароля', this.state)
                ;(e.target as HTMLButtonElement).classList.remove('error')
            } else {
                console.log('Ошибка смены пароля', this.state)
                ;(e.target as HTMLButtonElement).classList.add('error')
            }
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
                value: '',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            PasswordUserDataField: new UserDataFieldBlock({
                label: 'Новый пароль',
                name: 'newPassword',
                type: 'password',
                value: '',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            RepeatPasswordUserDataField: new UserDataFieldBlock({
                label: 'Повторите новый пароль',
                name: 'repeatNewPassword',
                type: 'password',
                value: '',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            SaveButton: new ButtonBlock({
                text: 'Сохранить',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => {
                        this.onSubmit(e)
                    },
                },
            }),
        }

        return this.compile(EditPasswordPageBlock, this.props)
    }
}
