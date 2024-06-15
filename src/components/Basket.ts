import { IBasketUI, IProductInBasket } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/Events';

export class Basket extends Component<IBasketUI> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(
        protected blockName: string,
        container: HTMLElement,
        protected events: IEvents
    ) {
        super(container);

        this._button = container.querySelector(`.${blockName}__button`);
        this._total = container.querySelector(`.${blockName}__price`);
        this._list = container.querySelector(`.${blockName}__list`);

        if (this._button) {
            this._button.addEventListener('click', () =>
                this.events.emit('basket:order')
            );
        }
    }

    // Метод для установки общей цены
    set total(price: number) {
        this.setText(this._total, price + ' синапсов');
    }

    // Метод для установки списка элементов корзины
    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        this.toggleButton(!items.length);
    }

    // Метод для переключения состояния кнопки
    toggleButton(isDisabled: boolean) {
        this.setDisabled(this._button, isDisabled);
    }
}

export interface IProductItemBasketActions {
    onClick: (event: MouseEvent) => void;
}

export class ProductItemBasket extends Component<IProductInBasket> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(
        protected blockName: string,
        container: HTMLElement,
        actions?: IProductItemBasketActions
    ) {
        super(container);

        this._title = container.querySelector(`.${blockName}__title`);
        this._index = container.querySelector(`.basket__item-index`);
        this._price = container.querySelector(`.${blockName}__price`);
        this._button = container.querySelector(`.${blockName}__button`);

        if (this._button) {
            this._button.addEventListener('click', (evt) => {
                this.container.remove();
                actions?.onClick(evt);
            });
        }
    }

    // Метод для установки заголовка
    set title(value: string) {
        this.setText(this._title, value);
    }

    // Метод для установки индекса элемента
    set index(value: number) {
        this.setText(this._index, value);
    }

    // Метод для установки цены
    set price(value: number) {
        this.setText(this._price, value + ' синапсов');
    }
}
