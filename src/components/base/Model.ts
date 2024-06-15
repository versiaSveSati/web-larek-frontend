import { IEvents } from "./Events";

// Проверка объекта на принадлежность к модели
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Абстрактный базовый класс модели для различения от обычных объектов
 */
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    // Уведомить всех подписчиков об изменении модели
    emitChanges(event: string, payload?: object) {
        // Содержимое данных можно изменить при необходимости
        this.events.emit(event, payload ?? {});
    }

}
