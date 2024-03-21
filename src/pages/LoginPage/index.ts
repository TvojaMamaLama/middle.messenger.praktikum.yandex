import './LoginPage.scss'
import LoginPageBlock from './LoginPage.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../../components/LocalButton'
import { InputFieldBlock } from '../../components/InputField'
import { PageTitleBlock } from '../../components/PageTitle'

export class LoginPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
        this.state = {
            login: '',
            password: '',
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
                title: 'Вход',
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
            PasswordInputField: new InputFieldBlock({
                title: 'Пароль',
                name: 'password',
                placeholder: '**********',
                type: 'password',
                events: {
                    focusout: (event: Event) => console.log(event),
                },
            }),
            AuthButton: new ButtonBlock({
                text: 'Авторизоваться',
                className: 'button button__primary',
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    },
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
