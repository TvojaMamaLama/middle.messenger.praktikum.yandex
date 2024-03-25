import './EditDataPage.scss'
import EditDataPageBlock from './EditDataPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { UserDataFieldBlock } from '../../components/UserDataField'
import { ProfileAvatarBlock } from '../../components/ProfileAvatar'
import { ProfileSidebarBlock } from '../../components/ProfileSidebar'
import {
    ErrorsMessage,
    UserDataFieldEnum,
    validation,
} from '../../utils/validation'

export class EditDataPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            login: '',
            email: '',
            first_name: '',
            second_name: '',
            display_name: '',
            phone: '',
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

    validateField(inputName: string, value: string) {
        const isValid = validation(
            inputName,
            value,
            this.state.newPassword ? (this.state.newPassword as string) : ''
        )
        const errorMessage: string = isValid
            ? ''
            : ErrorsMessage[inputName as keyof typeof ErrorsMessage]
        console.log(errorMessage)
        this.children[
            inputName == (inputName as keyof typeof UserDataFieldEnum)
                ? UserDataFieldEnum[inputName]
                : 'login'
        ]?.setProps({
            errorMessage: errorMessage,
            value: value,
        })
        this.state[inputName] = value
        return isValid
    }

    validateFieldList(): boolean {
        let isValid: boolean = true
        const inputElements: NodeListOf<HTMLInputElement> =
            document.querySelectorAll('.input')
        inputElements.forEach((inputElement: HTMLInputElement) => {
            const { name, value } = inputElement
            if (!this.validateField(name, value)) {
                isValid = false
            }
        })
        return isValid
    }

    onSubmit = (e: Event) => {
        e.preventDefault()
        if (e.target) {
            if (this.validateFieldList()) {
                console.log('Изменение данных', this.state)
                ;(e.target as HTMLButtonElement).classList.remove('error')
            } else {
                console.log('Ошибка изменения данных', this.state)
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
            EmailUserDataField: new UserDataFieldBlock({
                label: 'Почта',
                name: 'email',
                // value: 'email@yandex.ru',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            LoginUserDataField: new UserDataFieldBlock({
                label: 'Логин',
                name: 'login',
                type: 'text',
                // value: 'ivanivanov',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            FirstNameUserDataField: new UserDataFieldBlock({
                label: 'Имя',
                name: 'first_name',
                type: 'text',
                // value: 'Иван',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            SecondNameUserDataField: new UserDataFieldBlock({
                label: 'Фамилия',
                name: 'second_name',
                type: 'text',
                // value: 'Иванов',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            DisplayNameUserDataField: new UserDataFieldBlock({
                label: 'Имя в чате',
                name: 'display_name',
                type: 'text',
                // value: 'Ваня',
                canEdit: true,
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            PhoneUserDataField: new UserDataFieldBlock({
                label: 'Телефон',
                name: 'phone',
                type: 'text',
                // value: '+7 (909) 967 30 30',
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

        return this.compile(EditDataPageBlock, this.props)
    }
}
