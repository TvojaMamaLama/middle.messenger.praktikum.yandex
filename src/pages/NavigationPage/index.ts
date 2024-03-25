import Block from '../../tools/Block'
import NavigationPageBlock from './NavigationPage.hbs?raw'
import Link from '../../components/Link'

export class NavigationPage extends Block {
    constructor(props: { name?: string }) {
        super('div', { ...props })
    }

    render() {
        this.children = {
            LoginPageLink: new Link({
                href: 'login',
                label: 'Вход',
            }),
            SignupPageLink: new Link({
                href: 'signup',
                label: 'Регистрация',
            }),
            ErrorPageLink: new Link({
                href: 'error',
                label: '500 ошибка',
            }),
            NotFoundPageLink: new Link({
                href: 'not-found',
                label: '400 ошибка',
            }),
            PasswordLink: new Link({
                href: 'password',
                label: 'Смена пароля',
            }),
            EditLink: new Link({
                href: 'edit',
                label: 'Изменение данных',
            }),
            ProfileLink: new Link({
                href: 'profile',
                label: 'Профиль',
            }),
            ChatLink: new Link({
                href: 'chat',
                label: 'Чат',
            }),
        }

        return this.compile(NavigationPageBlock, this.props)
    }
}
