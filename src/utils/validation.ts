export const login_pattern =
    /^(?=.*[a-zA-Z])(?!.*\d{3,20}$)[a-zA-Z0-9_-]{3,20}$/

export const password_pattern = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
export const name_pattern = /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁ-]*[a-zа-яё]$/u
export const email_pattern = /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z]+$/
export const phone_pattern = /^\+?\d{10,15}$/

export const message_pattern = /^.+$/
export type FieldNameType =
    | 'login'
    | 'password'
    | 'email'
    | 'first_name'
    | 'second_name'
    | 'phone'
    | 'password_repeat'
    | 'old_password'

export enum FieldEnum {
    'email' = 'EmailInputField',
    'login' = 'LoginInputField',
    'first_name' = 'FirstNameInputField',
    'second_name' = 'SecondNameInputField',
    'phone' = 'PhoneInputField',
    'password' = 'PasswordInputField',
    'password_repeat' = 'RepeatPasswordInputField',
}

export enum ErrorsMessage {
    'login' = 'Неверный формат логина',
    'password' = 'Неверный формат пароля',
    'email' = 'Неверный формат email',
    'first_name' = 'Неверный формат имени',
    'second_name' = 'Неверный формат фамилии',
    'phone' = 'Неверный формат телефона',
    'password_repeat' = 'Пароль не совпадает',
    'old_password' = 'Неверный пароль',
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
