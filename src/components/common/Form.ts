// Импорт базового класса Component для формы и интерфейса событий
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
// Импорт утилитной функции ensureElement
import { ensureElement } from '../../utils/utils';

// Интерфейс для состояния формы, включая валидность и ошибки
interface IFormState {
    valid: boolean;
    errors: string[];
}

// Класс Form расширяет базовый класс Component и работает с формой
export class Form<T> extends Component<IFormState> {
    // Защищенные поля для кнопки отправки и элемента ошибок формы
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    // Конструктор класса принимает контейнер формы и объект событий
    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        // Инициализация полей _submit и _errors из контейнера формы
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // Обработчик события ввода в форме
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        // Обработчик события отправки формы
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // Предотвращение стандартного действия отправки формы
            this.events.emit(`${this.container.name}:submit`); // Генерация события submit для формы
        });
    }

    // Защищенный метод для обработки изменения ввода в поле формы
    protected onInputChange(field: keyof T, value: string) {
        console.log(`${this.container.name}.${String(field)}:change`);
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value,
        });
    }

    // Сеттер для установки состояния валидности формы
    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);
    }

    // Сеттер для установки ошибок формы
    set errors(value: string) {
        this.setText(this._errors, value);
    }

    // Метод для рендеринга формы с заданным состоянием
    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors }); // Вызов метода render базового класса Component
        Object.assign(this, inputs); // Присвоение значений остальных полей формы
        return this.container; // Возврат контейнера формы для дальнейшего использования
    }
}
