import { Model } from "./base/Model";
import { IProduct, IOrder, IAppState, FormErrors, IOrderValidate } from "../types";

export class Product extends Model<IProduct> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    status: boolean;
    price: number | null;
    selected: boolean;
}

export class AppState extends Model<IAppState> {
    basket: Product[] = [];
    catalog: Product[] = [];
    order: IOrder = this.getEmptyOrder();
    formErrors: FormErrors = {};

    // Метод для установки каталога продуктов
    setCatalog(items: IProduct[]) {
        this.catalog = items.map((item) => new Product(item, this.events));
        this.emitChanges('catalog:changed', { catalog: this.catalog });
    }

    // Метод для добавления продукта в корзину
    addToBasket(product: Product) {
        this.basket.push(product);
    }

    // Метод для удаления продукта из корзины
    removeFromBasket(product: Product) {
        this.basket = this.basket.filter((item) => item.id !== product.id);
    }

    // Метод для расчета общей стоимости корзины
    getTotalBasketPrice() {
        let total = 0;
        this.basket.forEach((item) => {
            total += item.price;
        });
        return total;
    }

    // Метод для получения пустого заказа
    getEmptyOrder(): IOrder {
        return {
            payment: '',
            address: '',
            email: '',
            phone: '',
            items: [],
            total: 0,
        };
    }

    // Метод для получения количества продуктов в корзине
    getCountProductInBasket() {
        return this.basket.length;
    }

    // Метод для установки полей заказа
    setOrderFields(field: keyof IOrderValidate, value: string) {
        this.order[field] = value;

        if (!this.validateOrder()) {
            return;
        }

        if (!this.validateContacts()) {
            return;
        }
    }

    // Метод для валидации заказа
    validateOrder(): boolean {
        const errors: typeof this.formErrors = {};

        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }

        this.formErrors = errors;

        this.events.emit('orderFormErrors:change', this.formErrors);

        return Object.keys(errors).length === 0;
    }

    // Метод для валидации контактных данных
    validateContacts(): boolean {
        const errors: typeof this.formErrors = {};

        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }

        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }

        this.formErrors = errors;
        this.events.emit('contactsFormErrors:change', this.formErrors);

        return Object.keys(errors).length === 0;
    }

    // Метод для добавления продуктов в заказ
    addProductsToOrder(): void {
        this.order.items = this.basket.map((product) => product.id);
    }

    // Метод для очистки корзины
    clearBasket(): void {
        this.basket = [];
    }

    // Метод для сброса выбранных продуктов
    resetSelected(): void {
        this.catalog.forEach((product) => {
            product.selected = false;
        });
    }

    // Метод для очистки заказа
    clearOrder(): void {
        this.order = this.getEmptyOrder();
    }
}
