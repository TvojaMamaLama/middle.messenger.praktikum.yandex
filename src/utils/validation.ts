export const login_pattern = /^[a-zA-Z_-]{3,20}\D$/
export const name_pattern = /^([А-ЯA-Z][а-яa-z-]*)$/
export const email_pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/
export const password_pattern = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
export const phone_pattern = /^\+?\d{10,15}$/
export const message_pattern = /^.*$/

export enum ErrorsMessage {
    'login' = 'Неверный формат логина',
    'password' = 'Недопустимый формат',
    'email' = 'Введите корректный email',
    'first_name' = 'Такого имени не бывает',
    'second_name' = 'Такой фамилии не бывает',
    'phone' = 'Неверный формат',
    'password_repeat' = 'Пароль не совпадает',
    'old-Password' = 'Неверный пароль',
}

export const validation = (
    type: string,
    value: string,
    repeat_value?: string
): boolean => {
    switch (type) {
        case 'login':
            return login_pattern.test(value)
        case 'password':
            return password_pattern.test(value)
        case 'email':
            return email_pattern.test(value)
        case 'name':
            return name_pattern.test(value)
        case 'phone':
            return phone_pattern.test(value)
        case 'new_passwrd':
        case 'password_repeat':
            return value === repeat_value
        default:
            return false
    }
}
