/**
 * Абстрактный базовый класс для компонентов
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Помните, что код конструктора выполняется до всех объявлений в наследуемых классах
    }

    // Метод для установки текстового содержимого элемента
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Метод для скрытия элемента
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Метод для отображения элемента
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Метод для установки изображения и альтернативного текста
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Метод для переключения класса CSS
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Метод для изменения состояния блокировки элемента
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) {
                element.setAttribute('disabled', 'disabled');
            } else {
                element.removeAttribute('disabled');
            }
        }
    }

    // Метод для получения корневого DOM-элемента
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
