// Импорт базового класса Component, утилитной функции ensureElement и интерфейса событий IEvents
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
// Импорт интерфейса IModal из типов
import { IModal } from '../../types';

// Класс Modal расширяет базовый класс Component для работы с модальным окном
export class Modal extends Component<IModal> {
    // Защищенные поля для кнопки закрытия и содержимого модального окна
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    // Конструктор класса принимает контейнер модального окна и объект событий
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        // Инициализация защищенных полей _closeButton и _content из контейнера модального окна
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        // Обработчик клика по кнопке закрытия модального окна
        this._closeButton.addEventListener('click', this.close.bind(this));
        // Обработчик клика в любом месте модального окна для его закрытия
        this.container.addEventListener('click', this.close.bind(this));
        // Обработчик клика по содержимому модального окна для предотвращения закрытия при всплытии события
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    // Сеттер для установки содержимого модального окна
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    // Метод для открытия модального окна
    open() {
        this.toggleClass(this.container, 'modal_active', true); // Добавление класса для отображения модального окна
        this.events.emit('modal:open'); // Генерация события открытия модального окна
    }

    // Метод для закрытия модального окна
    close() {
        this.toggleClass(this.container, 'modal_active', false); // Удаление класса для скрытия модального окна
        this.content = null; // Очистка содержимого модального окна
        this.events.emit('modal:close'); // Генерация события закрытия модального окна
    }

    // Метод для рендеринга модального окна с заданными данными
    render(data: IModal): HTMLElement {
        super.render(data); // Вызов метода render базового класса Component
        this.open(); // Автоматическое открытие модального окна при рендеринге
        return this.container; // Возврат контейнера модального окна для дальнейшего использования
    }
}
