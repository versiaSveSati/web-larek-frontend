# Проектная работа "Веб-ларек"

## Используемый стек

- **Шаблоны:** HTML
- **Стили:** SCSS
- **Язык программирования:** TypeScript
- **Сборка:** Webpack

## Паттерн проектирования

Мы используем паттерн MVP (Model-View-Presenter) для разделения бизнес-логики, пользовательского интерфейса и связующего слоя.

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды:

### Использование npm
```bash
npm install
npm run start
Использование yarn
bash

yarn
yarn start
Сборка
Использование npm
bash

npm run build
Использование yarn
bash

yarn build
Архитектура проекта
Структура проекта
src/ — исходные файлы проекта
src/components/ — папка с компонентами
src/components/base/ — папка с базовым кодом
src/pages/index.html — HTML-файл главной страницы
src/types/ — папка с типами данных и интерфейсами
src/index.ts — точка входа приложения
src/styles/styles.scss — корневой файл стилей
src/utils/constants.ts — файл с константами
src/utils/utils.ts — файл с утилитами
Описание компонентов и моделей данных
Класс AppData
Класс AppData относится к слою модели. Он содержит данные о продуктах и корзине.

Атрибуты:

products: Product[] — массив продуктов.
cart: Cart — объект корзины.
Методы:

addProduct(product: Product): void — добавляет продукт в массив продуктов.
getProductById(id: string): Product | undefined — возвращает продукт по его ID.
typescript

class AppData {
    products: Product[] = [];
    cart: Cart = new Cart();

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }
}
Класс Product
Класс Product представляет товар в магазине.

Атрибуты:

id: string — идентификатор продукта.
name: string — название продукта.
description: string — описание продукта.
price: number — цена продукта.
imageUrl: string — URL изображения продукта.
typescript

class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public imageUrl: string
    ) {}
}
Класс Cart
Класс Cart представляет корзину покупок.

Атрибуты:

items: Map<string, number> — карта товаров и их количества.
Методы:

addItem(productId: string, quantity: number = 1): void — добавляет товар в корзину.
removeItem(productId: string): void — удаляет товар из корзины.
getItems(): Map<string, number> — возвращает карту товаров и их количества.
clear(): void — очищает корзину.
typescript

class Cart {
    private items: Map<string, number> = new Map();

    addItem(productId: string, quantity: number = 1): void {
        if (this.items.has(productId)) {
            this.items.set(productId, this.items.get(productId)! + quantity);
        } else {
            this.items.set(productId, quantity);
        }
    }

    removeItem(productId: string): void {
        this.items.delete(productId);
    }

    getItems(): Map<string, number> {
        return this.items;
    }

    clear(): void {
        this.items.clear();
    }
}
Описание представлений (Views)
Интерфейс View
Интерфейс View определяет методы, которые будут реализованы в конкретных представлениях.

Методы:

render(): void — метод для рендеринга представления.
typescript

interface View {
    render(): void;
}
Класс ProductView
Класс ProductView отвечает за отображение товаров.

Атрибуты:

product: Product — продукт для отображения.
Методы:

render(): void — метод для рендеринга товара.
typescript

class ProductView implements View {
    constructor(private product: Product) {}

    render(): void {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${this.product.imageUrl}" alt="${this.product.name}">
            <h2>${this.product.name}</h2>
            <p>${this.product.description}</p>
            <span>${this.product.price}</span>
            <button>Add to Cart</button>
        `;
        document.body.appendChild(productElement);
    }
}
Класс CartView
Класс CartView отвечает за отображение корзины покупок.

Атрибуты:

cart: Cart — корзина для отображения.
Методы:

render(): void — метод для рендеринга корзины.
typescript

class CartView implements View {
    constructor(private cart: Cart) {}

    render(): void {
        const cartElement = document.createElement('div');
        cartElement.className = 'cart';
        const items = this.cart.getItems();
        cartElement.innerHTML = `
            <h2>Cart</h2>
            <ul>
                ${Array.from(items.entries()).map(([productId, quantity]) => `
                    <li>${productId}: ${quantity}</li>
                `).join('')}
            </ul>
        `;
        document.body.appendChild(cartElement);
    }
}
Описание презентеров (Presenters)
Интерфейс Presenter
Интерфейс Presenter определяет методы для управления моделью и представлением.

Методы:

initialize(): void — метод для инициализации презентера.
typescript

interface Presenter {
    initialize(): void;
}
Класс ShopPresenter
Класс ShopPresenter отвечает за связь между моделью и представлением.

Атрибуты:

appData: AppData — данные приложения.
productView: ProductView — представление товара.
cartView: CartView — представление корзины.
Методы:

initialize(): void — метод для инициализации приложения и привязки событий.
typescript

class ShopPresenter implements Presenter {
    constructor(
        private appData: AppData,
        private productView: ProductView,
        private cartView: CartView
    ) {}

    initialize(): void {
        this.productView.render();
        this.cartView.render();
        // Привязка событий и логики
    }
}
Событийная модель
Класс EventEmitter обеспечивает работу событий. Его функции:

Возможность установить и снять слушателей событий.
Вызвать слушателей при возникновении события.
Атрибуты:

events: { [key: string]: Function[] } — карта событий и их слушателей.
Методы:

on(event: string, listener: Function): void — добавляет слушателя события.
off(event: string, listenerToRemove: Function): void — удаляет слушателя события.
emit(event: string, data?: any): void — вызывает слушателей события.
typescript

class EventEmitter {
    private events: { [key: string]: Function[] } = {};

    on(event: string, listener: Function): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listenerToRemove: Function): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    emit(event: string, data?: any): void {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
}
Типы данных и интерфейсы
Типы данных для API
typescript

interface ProductAPI {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}
Интерфейсы модели данных
typescript

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface CartItem {
    productId: string;
    quantity: number;
}

interface Cart {
    addItem(productId: string, quantity: number): void;
    removeItem(productId: string): void;
    getItems(): Map<string, number>;
    clear(): void;
}
Интерфейсы отображений
typescript

interface View {
    render(): void;
}

interface ProductView extends View {
    render(): void;
}

interface CartView extends View {
    render(): void;
}
Интерфейсы базовых классов
typescript

interface EventEmitter {
    on(event: string, listener: Function): void;
    off(event: string, listenerToRemove: Function): void;
    emit(event: string, data?: any): void;
}
Перечисление событий и их интерфейсы
typescript

enum EventType {
    ADD_TO_CART = "add_to_cart",
    REMOVE_FROM_CART = "remove_from_cart",
    CHECKOUT = "checkout",
}

interface AddToCartEvent {
    type: EventType.ADD_TO_CART;
    productId: string;
}

interface RemoveFromCartEvent {
    type: EventType.REMOVE_FROM_CART;
    productId: string;
}

interface CheckoutEvent {
    type: EventType.CHECKOUT;
    cartItems: CartItem[];
}

type ShopEvent = AddToCartEvent | RemoveFromCartEvent | CheckoutEvent;
Взаимодействие между частями приложения
Модель хранит данные о продуктах и корзине.
Представление отвечает за отображение данных пользователю.
Презентер связывает модель и представление, обрабатывая логику и события.
Событийная модель используется для управления событиями и взаимодействия между компонентами.