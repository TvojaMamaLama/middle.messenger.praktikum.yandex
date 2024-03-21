import './SignupPage.scss'
import SignupPageBlock from './SignupPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { InputFieldBlock } from '../../components/InputField'
import { PageTitleBlock } from '../../components/PageTitle'

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
            PageTitle: new PageTitleBlock({
                title: 'Регистрация',
            }),

            EmailInputField: new InputFieldBlock({
                title: 'Почта',
                name: 'email',
                placeholder: 'email@yandex.ru',
                type: 'email',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            LoginInputField: new InputFieldBlock({
                title: 'Логин',
                name: 'login',
                placeholder: 'логин',
                type: 'text',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            FirstNameInputField: new InputFieldBlock({
                title: 'Имя',
                name: 'first_name',
                placeholder: 'Никита',
                type: 'text',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            SecondNameInputField: new InputFieldBlock({
                title: 'Фамилия',
                name: 'second_name',
                placeholder: 'Алешников',
                type: 'text',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            PhoneInputField: new InputFieldBlock({
                title: 'Телефон',
                name: 'phone',
                placeholder: '89101234567',
                type: '',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            PasswordInputField: new InputFieldBlock({
                title: 'Пароль',
                name: 'password',
                placeholder: '**********',
                type: 'password',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            RepeatPasswordInputField: new InputFieldBlock({
                title: 'Пароль (еще раз)',
                name: 'password',
                placeholder: '**********',
                type: 'password',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),

            SignupButton: new ButtonBlock({
                text: 'Зарегистрироваться',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
            ToLoginButton: new ButtonBlock({
                text: 'Войти',
                className: 'button button__text',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
                },
            }),
        }

        return this.compile(SignupPageBlock, this.props)
    }
}
