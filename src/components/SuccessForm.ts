import { ISuccessFormUI } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

interface ISuccessActions {
    onClick: (event: MouseEvent) => void;
}

export class SuccessForm extends Component<ISuccessFormUI> {
    protected _button: HTMLButtonElement;
    protected _description: HTMLElement;

    /**
     * Конструктор класса SuccessForm.
     * @param blockName Имя блока для поиска элементов в DOM.
     * @param container Корневой элемент формы.
     * @param actions Объект с действиями (например, onClick).
     */
    constructor(
        protected blockName: string,
        container: HTMLElement,
        actions?: ISuccessActions
    ) {
        super(container); // Вызов конструктора базового класса Component

        // Инициализация элементов формы
        this._button = ensureElement<HTMLButtonElement>(`.${blockName}__close`, container);
        this._description = ensureElement<HTMLElement>(`.${blockName}__description`, container);

        // Добавление обработчика клика на кнопку, если указаны действия
        if (actions?.onClick && this._button) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    /**
     * Установка текстового содержимого описания успешной операции.
     * @param value Числовое значение, которое будет добавлено к тексту.
     */
    set description(value: number) {
        this.setText(this._description, 'Списано ' + value + ' синапсов');
    }
}
