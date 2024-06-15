// Тип для ответа API, содержащий список элементов и общее количество
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};

// Типы методов для отправки данных (POST, PUT, DELETE)
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Класс для работы с API
export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        // Установка заголовков по умолчанию
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        this.baseUrl = baseUrl;
        this.options = {
            headers: { ...defaultHeaders, ...(options.headers ?? {}) },
        };
    }

    // Метод для отправки GET запроса
    async get(uri: string) {
        const requestOptions = { ...this.options, method: 'GET' };
        const response = await fetch(`${this.baseUrl}${uri}`, requestOptions);
        return this.processResponse(response);
    }

    // Метод для отправки POST, PUT или DELETE запроса
    async post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        const requestOptions = {
            ...this.options,
            method,  // Используется переданный метод (POST, PUT или DELETE)
            body: JSON.stringify(data),
        };
        const response = await fetch(`${this.baseUrl}${uri}`, requestOptions);
        return this.processResponse(response);
    }

    // Приватный метод для обработки ответа от сервера
    private async processResponse(response: Response): Promise<any> {
        const jsonData = await response.json();
        if (!response.ok) {
            throw jsonData.error ?? response.statusText;  // Бросаем ошибку, если ответ не успешен
        }
        return jsonData;  // Возвращаем данные из ответа
    }
}
