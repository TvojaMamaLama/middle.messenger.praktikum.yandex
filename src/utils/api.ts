export type RequestUrlType = string

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type Options = {
    method: METHOD
    data?: Record<string, string | number>
    timeout?: number
    headers?: Record<string, string>
    retries?: number
}

export type OptionsWithoutMethod = Omit<Options, 'method'>

const queryStringify = (data: Record<string, string | number>): string => {
    if (typeof data !== 'object') {
        throw new Error('Не является объектом')
    }

    const queryString = Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join('&')

    return `?${queryString}`
}

export class HTTPTransport {
    async request(
        url: RequestUrlType,
        options: Options
    ): Promise<XMLHttpRequest> {
        const { method, data, headers = {}, timeout = 5000 } = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(
                method,
                method === METHOD.GET && !!data
                    ? `${url}${queryStringify(data)}`
                    : url
            )

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            xhr.onload = () => resolve(xhr)

            xhr.onerror = () =>
                reject(new Error('Ошибка при выполнении запроса'))

            xhr.timeout = timeout
            xhr.ontimeout = () => reject(new Error('Истекло время ожидания'))

            xhr.onabort = () => reject(new Error('Прерван запрос'))

            if (method === METHOD.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }

    async get(url: RequestUrlType, options: Options): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.GET })
    }

    async post(url: RequestUrlType, options: Options): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST })
    }

    async put(url: RequestUrlType, options: Options): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT })
    }

    async delete(
        url: RequestUrlType,
        options: Options
    ): Promise<XMLHttpRequest> {
        return this.request(url, {
            ...options,
            method: METHOD.DELETE,
        })
    }
}

export const fetchWithRetry = async (
    url: RequestUrlType,
    options: Options,
    retries = 3
): Promise<XMLHttpRequest | Error> => {
    const fetch = new HTTPTransport()
    try {
        const response = await fetch.request(url, options)
        return response
    } catch (err) {
        if (retries > 0) {
            return fetchWithRetry(url, options, retries - 1)
        } else {
            throw new Error('Не удалось отправить запрос')
        }
    }
}
