import './MessageField.scss'
import MessageField from './MessageField.hbs?raw'
import Block from '../../tools/Block'
import { ButtonBlock } from '../LocalButton'
import {
    ErrorsMessage,
    InputFieldEnum,
    validation,
} from '../../utils/validation'
import { MessageInputBlock } from '../MessageInput'

export class MessageFieldBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', { ...props })
        this.state = {
            message: '',
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
        console.log(errorMessage)
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
                console.log('Отправка сообщения', this.state)
                ;(e.target as HTMLButtonElement).classList.remove('send-error')
            } else {
                console.log('Пустое сообщение нельзя отправить', this.state)
                ;(e.target as HTMLButtonElement).classList.add('send-error')
            }
        }
    }

    render() {
        this.children = {
            ActionMenuButton: new ButtonBlock({
                icon: 'pin',
                className: 'button button__primary button__circle',
            }),
            MessageInput: new MessageInputBlock({
                name: 'message',
                events: {
                    focusout: (event: Event) => this.onChange(event),
                },
            }),
            SendButton: new ButtonBlock({
                icon: 'arrow-right',
                width: '28',
                height: '28',
                className: 'button button__primary button__circle',
                events: {
                    click: (e: Event) => {
                        this.onSubmit(e)
                    },
                },
            }),
        }

        return this.compile(MessageField, this.props)
    }
}
