import './EditDataPage.scss'
import EditDataPageBlock from './EditDataPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { UserDataFieldBlock } from '../../components/UserDataField'
import { ProfileAvatarBlock } from '../../components/ProfileAvatar'
import { ProfileSidebarBlock } from '../../components/ProfileSidebar'

export class EditDataPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            login: '',
            password: '',
            email: '',
            first_name: '',
            second_name: '',
            display_name: '',
            phone: '',
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
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            LoginUserDataField: new UserDataFieldBlock({
                label: 'Логин',
                name: 'login',
                type: 'text',
                value: 'ivanivanov',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            FirstNameUserDataField: new UserDataFieldBlock({
                label: 'Имя',
                name: 'first_name',
                type: 'text',
                value: 'Иван',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            SecondNameUserDataField: new UserDataFieldBlock({
                label: 'Фамилия',
                name: 'second_name',
                type: 'text',
                value: 'Иванов',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            DisplayNameUserDataField: new UserDataFieldBlock({
                label: 'Имя в чате',
                name: 'display_name',
                type: 'text',
                value: 'Ваня',
                canEdit: true,
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            PhoneUserDataField: new UserDataFieldBlock({
                label: 'Телефон',
                name: 'phone_name',
                type: 'text',
                value: '+7 (909) 967 30 30',
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

        return this.compile(EditDataPageBlock, this.props)
    }
}
