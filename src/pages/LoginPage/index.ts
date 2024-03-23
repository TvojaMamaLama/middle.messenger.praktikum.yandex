import './LoginPage.scss'
import LoginPageBlock from './LoginPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { InputFieldBlock } from '../../components/InputField'
import { PageTitleBlock } from '../../components/PageTitle'
import {
    ErrorsMessage,
    validation,
    InputFieldEnum,
} from '../../utils/validation'

export class LoginPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            login: '',
            password: '',
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
        const isValid = validation(inputName, value)
        const errorMessage: string = isValid
            ? ''
            : ErrorsMessage[inputName as keyof typeof ErrorsMessage]
        this.children[
            inputName == (inputName as keyof typeof InputFieldEnum)
                ? InputFieldEnum[inputName]
                : ''
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
                console.log('Авторизация', this.state)
                ;(e.target as HTMLButtonElement).classList.remove('error')
            } else {
                console.log('Ошибка авторизации', this.state)
                ;(e.target as HTMLButtonElement).classList.add('error')
            }
        }
    }

    render() {
        this.children = {
            PageTitle: new PageTitleBlock({
                title: 'Вход',
            }),
            LoginInputField: new InputFieldBlock({
                title: 'Логин',
                name: 'login',
                placeholder: 'логин',
                type: 'text',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            PasswordInputField: new InputFieldBlock({
                title: 'Пароль',
                name: 'password',
                placeholder: '**********',
                type: 'password',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            LoginButton: new ButtonBlock({
                text: 'Авторизоваться',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => this.onSubmit(e),
                },
            }),
            ToSignupButton: new ButtonBlock({
                text: 'Нет аккаунта?',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        console.log(e)
                    },
                },
            }),
        }

        return this.compile(LoginPageBlock, this.props)
    }
}
