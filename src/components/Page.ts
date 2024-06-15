import { Component } from "./base/Component";
import { IEvents } from "./base/Events";
import { ensureElement } from "../utils/utils";
import { IPageUI } from "../types";

export class Page extends Component<IPageUI> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    /**
     * Конструктор класса Page.
     * @param container Корневой элемент страницы.
     * @param events Объект для работы с событиями.
     */
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container); // Вызов конструктора базового класса Component

        // Инициализация основных элементов страницы
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._catalog = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        // Добавление обработчика клика на корзину
        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open'); // Отправка события 'basket:open'
        });
    }

    /**
     * Установка значения счетчика корзины.
     * @param value Значение счетчика.
     */
    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    /**
     * Установка содержимого каталога.
     * @param items Элементы для замены в каталоге.
     */
    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    /**
     * Установка заблокированного состояния страницы.
     * @param value true для блокировки, false для разблокировки.
     */
    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
    }
}
