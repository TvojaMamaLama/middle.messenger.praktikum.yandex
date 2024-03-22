import './main.scss'
import * as Pages from './pages'
import Block from './tools/Block'

const pages: { [key: string]: Block } = {
    '/login': new Pages.LoginPage({ name: 'Login' }),
    '/': new Pages.LoginPage({ name: 'Login' }),
    '/signup': new Pages.SignupPage({ name: 'Signup' }),
    '/error': new Pages.NotFoundPage({ name: 'Error' }),
    '/not-found': new Pages.NotFoundPage({ name: 'NotFound' }),
    '/password': new Pages.EditPasswordPage({ name: 'Password' }),
    '/edit': new Pages.EditDataPage({ name: 'Edit' }),
    '/profile': new Pages.ProfilePage({ name: 'Profile' }),
    '/chat': new Pages.ChatPage({ name: 'Chat' }),
}

const { pathname } = window.location

const renderDOM = (query: string, block: Block) => {
    const root = document.querySelector(query)
    if (root) {
        root.appendChild(block.getContent() as HTMLElement)
    }
    block.dispatchComponentDidMount()
    return root
}

const render = () => {
    const Page = pages[pathname]
    if (Page) {
        renderDOM('#app', Page)
    }
}

render()
