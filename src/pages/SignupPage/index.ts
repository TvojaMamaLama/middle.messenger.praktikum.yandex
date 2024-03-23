import './SignupPage.scss'
import SignupPageBlock from './SignupPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { InputFieldBlock } from '../../components/InputField'
import { PageTitleBlock } from '../../components/PageTitle'
import {
    ErrorsMessage,
    validation,
    InputFieldEnum,
} from '../../utils/validation'

export class SignupPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            login: '',
            password: '',
            email: '',
            first_name: '',
            second_name: '',
            phone: '',
            password_repeat: '',
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
        this.children[
            inputName == (inputName as keyof typeof InputFieldEnum)
                ? InputFieldEnum[inputName]
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
                console.log('Регистрация', this.state)
                ;(e.target as HTMLButtonElement).classList.remove('error')
            } else {
                console.log('Ошибка регистрации', this.state)
                ;(e.target as HTMLButtonElement).classList.add('error')
            }
        }
    }

    render() {
        this.children = {
            PageTitle: new PageTitleBlock({
                title: 'Регистрация',
            }),

            EmailInputField: new InputFieldBlock({
                title: 'Почта',
                name: 'email',
                placeholder: 'email@yandex.ru',
                type: 'email',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
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
            FirstNameInputField: new InputFieldBlock({
                title: 'Имя',
                name: 'first_name',
                placeholder: 'Никита',
                type: 'text',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            SecondNameInputField: new InputFieldBlock({
                title: 'Фамилия',
                name: 'second_name',
                placeholder: 'Алешников',
                type: 'text',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            PhoneInputField: new InputFieldBlock({
                title: 'Телефон',
                name: 'phone',
                placeholder: '89101234567',
                type: '',
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
            RepeatPasswordInputField: new InputFieldBlock({
                title: 'Пароль (еще раз)',
                name: 'password_repeat',
                placeholder: '**********',
                type: 'password',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),

            SignupButton: new ButtonBlock({
                text: 'Зарегистрироваться',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => this.onSubmit(e),
                },
            }),
            ToLoginButton: new ButtonBlock({
                text: 'Войти',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        console.log(e)
                    },
                },
            }),
        }

        return this.compile(SignupPageBlock, this.props)
    }
}
