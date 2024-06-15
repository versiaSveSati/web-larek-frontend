import { Api, ApiListResponse } from './base/Api';
import { IOrder, IOrderResult, IProduct } from '../types';

// Интерфейс для API Larek
export interface ILarekAPI {
    getProductById: (id: string) => Promise<IProduct>;
    getProductList: () => Promise<IProduct[]>;
    createOrder: (order: IOrder) => Promise<IOrderResult>;
}

// Класс реализации API Larek
export class LarekAPI extends Api implements ILarekAPI {
    readonly cdn: string; // Базовый URL для CDN

    // Конструктор класса
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options); // Вызов конструктора базового класса Api
        this.cdn = cdn; // Инициализация базового URL для CDN
    }

    // Получение списка продуктов
    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image, // Обновление URL изображения продуктов
            }))
        );
    }

    // Получение продукта по его идентификатору
    getProductById(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((item: IProduct) => ({
            ...item,
            image: this.cdn + item.image, // Обновление URL изображения продукта
        }));
    }

    // Создание заказа
    createOrder(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((result: IOrderResult) => ({
            id: result.id,
            total: result.total,
        }));
    }
}
