// import Handlebars from 'handlebars'
import './main.scss'
// import * as Components from './components'
import * as Pages from './pages'
import Block from './tools/Block'

// const pages: { [key: string]: string[] } | { [key: string]: Block[] } = {
//     chat: [Pages.ChatPage],
//     login: [new Pages.LoginPage()],
//     signup: [Pages.SignupPage],
//     profile: [Pages.ProfilePage],
//     edit: [Pages.EditDataPage],
//     password: [Pages.EditPasswordPage],
// }

const pages: { [key: string]: Block } = {
    '/login': new Pages.LoginPage({ name: 'Login' }),
    '/signup': new Pages.SignupPage({ name: 'Signup' }),
    '/error': new Pages.NotFoundPage({ name: 'Error' }),
    '/not-found': new Pages.NotFoundPage({ name: 'NotFound' }),
    '/password': new Pages.EditPasswordPage({ name: 'Password' }),
    '/edit': new Pages.EditDataPage({ name: 'Edit' }),
    '/profile': new Pages.ProfilePage({ name: 'Profile' }),
    '/': new Pages.ProfilePage({ name: 'Profile' }),
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

// Object.entries(Components).forEach(([name, component]) => {
//     Handlebars.registerPartial(name, component)
// })

// function navigate(page: string) {
//     const pageComponent = pages[page] || [Pages.ErrorPage]
//     const [source, args] = pageComponent
//     const handlebarsFunct = Handlebars.compile(source)
//     document.querySelector<HTMLDivElement>('#app')!.innerHTML =
//         handlebarsFunct(args)
//     history.pushState({ page }, 'null', `/${page}`)
// }

// function handleNavigation() {
//     const path = window.location.pathname.slice(1)
//     if (path === '') {
//         navigate('chat') // Открываем страницу чата по умолчанию, если URL пустой
//     } else {
//         navigate(path)
//     }
// }

// document.addEventListener('DOMContentLoaded', handleNavigation)

// document.addEventListener('click', (e: Event) => {
//     const page = (e.target as HTMLElement).getAttribute('page')
//     if (page) {
//         navigate(page)
//         e.preventDefault()
//     }
// })

// // Обработка изменения URL
// window.addEventListener('popstate', () => {
//     handleNavigation()
// })
