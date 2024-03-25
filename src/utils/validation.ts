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
    | 'display_name'
    | 'old_password'

export enum InputFieldEnum {
    'email' = 'EmailInputField',
    'first_name' = 'FirstNameInputField',
    'second_name' = 'SecondNameInputField',
    'phone' = 'PhoneInputField',

    'login' = 'LoginInputField',
    'password' = 'PasswordInputField',
    'password_repeat' = 'RepeatPasswordInputField',

    'message' = 'MessageInput',
}

export enum UserDataFieldEnum {
    'email' = 'EmailUserDataField',
    'login' = 'LoginUserDataField',
    'first_name' = 'FirstNameUserDataField',
    'second_name' = 'SecondNameUserDataField',
    'phone' = 'PhoneUserDataField',
    'display_name' = 'DisplayNameUserDataField',

    'oldPassword' = 'OldPasswordUserDataField',
    'newPassword' = 'PasswordUserDataField',
    'repeatNewPassword' = 'RepeatPasswordUserDataField',
}

export enum ErrorsMessage {
    'login' = 'Неверный формат логина',
    'password' = 'Неверный формат пароля',
    'email' = 'Неверный формат email',
    'first_name' = 'Неверный формат имени',
    'second_name' = 'Неверный формат фамилии',
    'display_name' = 'Неверный формат',
    'phone' = 'Неверный формат телефона',
    'password_repeat' = 'Пароль не совпадает',
    'old_password' = 'Неверный пароль',
    'oldPassword' = 'Неверный пароль!',
    'newPassword' = 'Неверный формат нового пароля',
    'repeatNewPassword' = 'Не совпадает',
    'message' = 'Пустое сообщение',
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
        case 'newPassword':
            return password_pattern.test(value)
        case 'message':
            return message_pattern.test(value)
        case 'email':
            return email_pattern.test(value)
        case 'first_name':
        case 'second_name':
        case 'display_name':
            return name_pattern.test(value)
        case 'phone':
            return phone_pattern.test(value)
        case 'repeatNewPassword':
            return value === repeat_value
        default:
            return false
    }
}
