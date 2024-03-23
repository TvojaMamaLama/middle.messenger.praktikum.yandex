// import { validateField } from './validateField'

// // interface Children {
// //     [key: string]: {
// //         setProps: (props: unknown) => void // здесь нужно указать корректный тип props
// //     }
// // }

// export function validateFieldList(
//     children: NodeListOf<HTMLInputElement>,
//     state: Record<string, string>
// ): boolean {
//     let isValid: boolean = true
//     const inputElements: NodeListOf<HTMLInputElement> =
//         document.querySelectorAll('.input')
//     inputElements.forEach((inputElement: HTMLInputElement) => {
//         const { name, value } = inputElement
//         if (!validateField(name, value, children, state)) {
//             isValid = false
//         }
//     })
//     return isValid
// }
