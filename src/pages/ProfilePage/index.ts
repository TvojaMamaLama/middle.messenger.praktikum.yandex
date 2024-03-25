import './ProfilePage.scss'
import ProfilePageBlock from './ProfilePage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { UserDataFieldBlock } from '../../components/UserDataField'
import { ProfileAvatarBlock } from '../../components/ProfileAvatar'
import { ProfileSidebarBlock } from '../../components/ProfileSidebar'

export class ProfilePage extends Block {
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
            EmailUserDataField: new UserDataFieldBlock({
                label: 'Почта',
                name: 'email',
                value: 'email@yandex.ru',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            LoginUserDataField: new UserDataFieldBlock({
                label: 'Логин',
                name: 'login',
                type: 'text',
                value: 'ivanivanov',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            FirstNameUserDataField: new UserDataFieldBlock({
                label: 'Имя',
                name: 'first_name',
                type: 'text',
                value: 'Иван',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            SecondNameUserDataField: new UserDataFieldBlock({
                label: 'Фамилия',
                name: 'second_name',
                type: 'text',
                value: 'Иванов',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            DisplayNameUserDataField: new UserDataFieldBlock({
                label: 'Имя в чате',
                name: 'display_name',
                type: 'text',
                value: 'Ваня',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            PhoneUserDataField: new UserDataFieldBlock({
                label: 'Телефон',
                name: 'phone',
                type: 'text',
                value: '+7 (909) 967 30 30',
                canEdit: false,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            EditDataButton: new ButtonBlock({
                text: 'Изменить данные',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
            EditPasswordButton: new ButtonBlock({
                text: 'Изменить пароль',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
            ExitButton: new ButtonBlock({
                text: 'Выйти',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
        }

        return this.compile(ProfilePageBlock, this.props)
    }
}
