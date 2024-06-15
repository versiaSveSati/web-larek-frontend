import { IContactsFormUI } from '../types';
import { IEvents } from './base/Events';
import { Form } from './common/Form';

export class ContactsForm extends Form<IContactsFormUI> {
    protected _phoneNumber: HTMLInputElement;
    protected _email: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        // Инициализация элементов формы по их именам
        this._phoneNumber = container.elements.namedItem('phone') as HTMLInputElement;
        this._email = container.elements.namedItem('email') as HTMLInputElement;
    }

    // Установка значения телефона
    set phoneNumber(value: string) {
        this._phoneNumber.value = value;
    }

    // Установка значения email
    set email(value: string) {
        this._email.value = value;
    }

    // Очистка полей формы
    clear() {
        this._phoneNumber.value = '';
        this._email.value = '';
    }

    // Перемещение метода на верхний уровень класса, если требуется логическое объединение функций по работе с формой
    // Методы установки и очистки полей формы остаются в их текущих позициях для лучшей читаемости и организации кода
}
