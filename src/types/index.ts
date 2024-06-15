// Интерфейс, описывающий глобальное состояние приложения
export interface IAppState {
  catalog: IProduct[];  // Массив продуктов в каталоге
  basket: IProduct[];   // Массив продуктов в корзине
  order: IOrder | null; // Текущий заказ или null, если заказа нет

  // Методы для управления состоянием каталога и корзины
  setCatalog(items: IProduct[]): void;        // Устанавливает новый список продуктов в каталоге
  addToBasket(product: IProduct): void;        // Добавляет продукт в корзину
  removeFromBasket(product: IProduct): void;   // Удаляет продукт из корзины
}

// Интерфейс, описывающий структуру продукта
export interface IProduct {
  id: string;               // Уникальный идентификатор продукта
  description: string;      // Описание продукта
  image: string;            // Путь к изображению продукта
  title: string;            // Название продукта
  category: string;         // Категория продукта
  price: number | null;     // Цена продукта или null, если продукт бесплатный
  selected: boolean;        // Флаг выбора продукта (для корзины или других целей)
}

// Интерфейс описывает товар в списке корзины
export interface IProductInBasket extends IProduct {
  index: number;            // Индекс продукта в корзине
}

// Интерфейс для UI формы оплаты
export interface IPaymentFormUI {
  payment: string;          // Тип оплаты (например, "cash" или "card")
  address: string;          // Адрес доставки или пункт самовывоза
}

// Интерфейс для UI формы контактов
export interface IContactsFormUI {
  email: string;            // Адрес электронной почты пользователя
  phone: string;            // Номер телефона пользователя
}

// Интерфейс для данных о заказе
export interface IOrder extends IPaymentFormUI, IContactsFormUI {
  items: string[];          // Массив идентификаторов продуктов в заказе
  total: number;            // Общая стоимость заказа
}

// Интерфейс описывающий ответ успешной покупки
export interface IOrderResult {
  id: string;               // Уникальный идентификатор заказа
  total: number;            // Общая стоимость заказа
}

// Интерфейс описывает форму успешного заказа
export interface ISuccessFormUI {
  description: number;      // Количество синапсов списанных при успешной покупке
}

// Интерфейс используется для валидации полей при заполнении модели заказа
export interface IOrderValidate {
  phone: string;            // Номер телефона (для валидации)
  email: string;            // Адрес электронной почты (для валидации)
  address: string;          // Адрес доставки (для валидации)
  payment: string;          // Тип оплаты (для валидации)
}

// Интерфейс описывающий содержимое модельного окна
export interface IModal {
  content: HTMLElement;    // Контент модального окна
}

// Интерфейс описывающий UI корзины
export interface IBasketUI {
  list: HTMLElement[];     // Список элементов в корзине (HTML элементы продуктов)
  total: number;           // Общая стоимость товаров в корзине
}

// Интерфейс для UI главной страницы
export interface IPageUI {
  counter: number;          // Счетчик корзины на главной странице
  catalog: HTMLElement[];   // Элементы каталога на главной странице (HTML элементы продуктов)
  locked: boolean;          // Флаг блокировки интерфейса страницы
}

// Ошибка формы ввода
export type FormErrors = Partial<Record<keyof IOrder, string>>;
