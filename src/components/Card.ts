import { Component } from "./base/Component";
import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";

// Интерфейс для обработчиков событий карточки
interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

// Класс карточки продукта
export class Card extends Component<IProduct> {
    protected _titleElement: HTMLElement;
    protected _imageElement: HTMLImageElement;
    protected _categoryElement: HTMLElement;
    protected _priceElement: HTMLElement;
    protected _descriptionElement: HTMLElement;
    protected _buttonElement?: HTMLButtonElement;

    // Конструктор класса
    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container); // Вызов конструктора базового класса Component

        // Инициализация элементов карточки из DOM
        this._titleElement = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._imageElement = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._categoryElement = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._priceElement = container.querySelector(`.${blockName}__price`);
        this._descriptionElement = container.querySelector(`.${blockName}__description`);
        this._buttonElement = container.querySelector(`.${blockName}__button`);

        // Установка обработчика клика на кнопку или контейнер, если переданы actions
        if (actions?.onClick) {
            if (this._buttonElement) {
                this._buttonElement.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    // Установка идентификатора продукта в атрибут dataset элемента container
    set id(value: string) {
        this.container.dataset.id = value;
    }

    // Получение идентификатора продукта из атрибута dataset элемента container
    get id(): string {
        return this.container.dataset.id || '';
    }

    // Установка заголовка продукта
    set title(value: string) {
        this.setText(this._titleElement, value);
    }

    // Получение заголовка продукта
    get title(): string {
        return this._titleElement.textContent || '';
    }

    // Установка категории продукта
    set category(value: string) {
        this.setText(this._categoryElement, value);
    }

    // Установка и отображение цены продукта
    set price(value: number | null) {
        this.setText(
            this._priceElement,
            value ? `${value.toString()} синапсов` : 'Бесценно'
        );

        // Если цена не указана (null), блокируем кнопку и меняем текст
        if (value === null) {
            this.setDisabled(this._buttonElement, true);
            this.setText(this._buttonElement, 'Нельзя купить');
        }
    }

    // Получение цены продукта (преобразование текста в число)
    get price(): number {
        return +this._priceElement.textContent || 0;
    }

    // Установка изображения продукта
    set image(value: string) {
        this.setImage(this._imageElement, value, this.title);
    }

    // Установка описания продукта
    set description(value: string | string[]) {
        this.setText(this._descriptionElement, value);
    }

    // Установка текста на кнопке действия
    set button(value: string) {
        // Если цена "Бесценно", блокируем кнопку и меняем текст
        if (this._priceElement.textContent === 'Бесценно') {
            this.setDisabled(this._buttonElement, true);
            this.setText(this._buttonElement, 'Нельзя купить');
        } else {
            this.setText(this._buttonElement, value);
        }
    }

    // Обновление текста на кнопке действия в зависимости от состояния
    updateButton(selected: boolean) {
        if (selected) {
            this.button = 'Убрать из корзины';
        } else {
            this.button = 'В корзину';
        }
    }
}

// Класс предварительного просмотра карточки продукта
export class CardPreview extends Card {
    protected _descriptionElement: HTMLElement;

    // Конструктор класса предварительного просмотра
    constructor(container: HTMLElement, actions?: ICardActions) {
        super('card', container, actions); // Вызов конструктора базового класса Card

        // Инициализация элемента описания из DOM
        this._descriptionElement = ensureElement<HTMLElement>(`.card__text`, container);
    }

    // Установка описания продукта в предварительном просмотре
    set description(value: string) {
        this.setText(this._descriptionElement, value);
    }
}
