// import { validation } from './validation'
// import { ErrorsMessage } from './validation'

// // interface Children {
// //     [key: string]: {
// //         setProps: (props: unknown) => void // здесь нужно указать корректный тип props
// //     }
// // }

// export function validateField(
//     inputName: string,
//     value: string,
//     children: NodeListOf<HTMLInputElement>,
//     state: Record<string, string>
// ): boolean {
//     const isValid = validation(inputName, value)
//     const errorMessage: string = isValid
//         ? ''
//         : ErrorsMessage[inputName as keyof typeof ErrorsMessage]
//     children[
//         inputName == (inputName as keyof typeof Blocks)
//             ? Blocks[inputName]
//             : 'login'
//     ]?.setProps({
//         errorMessage: errorMessage,
//         value: value,
//     })
//     if (inputName === 'password_repeat') {
//         return isValid
//     }
//     state[inputName] = value
//     return isValid
// }
