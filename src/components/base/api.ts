export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            },
            ...options,  // добавляем другие опции, переданные при инициализации
        };
    }

    protected handleResponse(response: Response): Promise<any> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    get<T>(uri: string): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }

    put<T>(uri: string, data: object): Promise<T> {
        return this.post(uri, data, 'PUT');
    }

    delete<T>(uri: string): Promise<T> {
        return this.post(uri, {}, 'DELETE');
    }

    fetchData<T>(uri: string): Promise<T> {
        return this.get<T>(uri);
    }
}

export const api = new Api('https://larek-api.nomoreparties.co/product/api/weblarek'); 