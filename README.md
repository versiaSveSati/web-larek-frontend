# Проектная работа "Веб-ларек"

## Используемый стек

- **Шаблоны:** HTML
- **Стили:** SCSS
- **Язык программирования:** TypeScript
- **Сборка:** Webpack

## Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — папка с компонентами
- `src/components/base/` — папка с базовым кодом
- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/styles/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды:

### Использование npm
```bash
npm install
npm run start
Использование yarn
bash

yarn
yarn start
Сборка
Использование npm
bash

npm run build
Использование yarn
bash

yarn build
Описание базовых классов, их предназначение и функции
EventEmitter
Класс EventEmitter обеспечивает работу событий. Его функции:

Возможность установить и снять слушателей событий.
Вызвать слушателей при возникновении события.
typescript

class EventEmitter {
    private events: { [key: string]: Function[] } = {};

    on(event: string, listener: Function): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listenerToRemove: Function): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    emit(event: string, data?: any): void {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
}
Описание компонентов, их функций и связей с другими компонентами
Компонент Hero
Компонент Hero отображает контент в виде любого другого произвольного компонента. Например, на странице используется компонент Film и кнопка действия, используя компонент Button.

typescript

import Film from './Film';
import Button from './Button';

class Hero {
    render(): HTMLElement {
        const heroElement = document.createElement('div');
        heroElement.className = 'hero';

        const film = new Film();
        heroElement.appendChild(film.render());

        const button = new Button('Click me');
        heroElement.appendChild(button.render());

        return heroElement;
    }
}

export default Hero;
Описание архитектуры проекта
Основные части архитектуры:
Данные: Управляются с помощью TypeScript классов.
Отображения: HTML, рендеринг через TypeScript.
Стили: SCSS для стилей.
Назначение частей:
Данные: Обеспечивают хранение и управление данными.
Отображения: Обеспечивают рендеринг UI.
Стили: Обеспечивают стилизацию компонентов.
Взаимодействие частей:
Компоненты: Взаимодействуют друг с другом через DOM.
События: Управляются через EventEmitter.
Типы данных:
Пользователь:

typescript

interface User {
    id: string;
    name: string;
    email: string;
}

Фильм:

typescript

interface Film {
    id: string;
    title: string;
    description: string;
    year: number;
}
Процессы в приложении:
Регистрация и аутентификация пользователей
CRUD операции для фильмов
