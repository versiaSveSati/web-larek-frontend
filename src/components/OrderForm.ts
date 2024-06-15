import { IPaymentFormUI } from '../types';
import { IEvents } from './base/Events';
import { Form } from './common/Form';

export class OrderForm extends Form<IPaymentFormUI> {
    protected _card: HTMLButtonElement;
    protected _cash: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(
        protected blockName: string,
        container: HTMLFormElement,
        protected events: IEvents
    ) {
        super(container, events); // Вызов конструктора базового класса Form

        // Инициализация элементов формы
        this._card = container.elements.namedItem('card') as HTMLButtonElement;
        this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
        this._address = container.elements.namedItem('address') as HTMLInputElement;

        // Добавление обработчиков событий на кнопки оплаты
        if (this._cash) {
            this._cash.addEventListener('click', () => {
                this.toggleCash(true); // Включение кнопки наличными
                this.toggleCard(false); // Выключение кнопки картой
                this.onInputChange('payment', 'cash'); // Вызов обработчика изменения ввода для оплаты наличными
            });
        }
        if (this._card) {
            this._card.addEventListener('click', () => {
                this.toggleCash(false); // Выключение кнопки наличными
                this.toggleCard(true); // Включение кнопки картой
                this.onInputChange('payment', 'card'); // Вызов обработчика изменения ввода для оплаты картой
            });
        }
    }

    /**
     * Метод для переключения состояния кнопки наличными.
     * @param state true, чтобы включить кнопку, false, чтобы выключить.
     */
    toggleCash(state: boolean) {
        this.toggleClass(this._cash, 'button_alt-active', state); // Включение/выключение класса активности
    }

    /**
     * Метод для переключения состояния кнопки картой.
     * @param state true, чтобы включить кнопку, false, чтобы выключить.
     */
    toggleCard(state: boolean) {
        this.toggleClass(this._card, 'button_alt-active', state); // Включение/выключение класса активности
    }

    /**
     * Метод для очистки формы.
     * Выключает обе кнопки выбора способа оплаты и очищает поле адреса.
     */
    clear() {
        this.toggleCash(false); // Выключение кнопки наличными
        this.toggleCard(false); // Выключение кнопки картой
        this._address.value = ''; // Очистка поля адреса
    }
}
