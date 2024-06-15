// Импорты стилей и типов
import './scss/styles.scss';
import {
	IContactsFormUI,
	IOrderResult,
	IOrderValidate,
	IPaymentFormUI,
} from './types';

// Базовые компоненты и утилиты
import { EventEmitter } from './components/base/Events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { LarekAPI } from './components/LarekAPI';
import { AppState, Product } from './components/AppState';
import { Modal } from './components/common/Modal';
import { Basket, ProductItemBasket } from './components/Basket';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { SuccessForm } from './components/SuccessForm';
import { Page } from './components/Page';
import { Card, CardPreview } from './components/Card';

// Константы и шаблоны
import { API_URL, CDN_URL } from './utils/constants';

// Получение шаблонов и инициализация событий
const productTemplateCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const confirmationTemplate = ensureElement<HTMLTemplateElement>('#success');
const events = new EventEmitter();
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const productItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const contactFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const appData = new AppState({}, events);
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const api = new LarekAPI(CDN_URL, API_URL);

// Инициализация основных компонентов страницы и модального окна
const page = new Page(document.body, events);
const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


// Инициализация форм заказа, контактов и успешного завершения заказа
const orderForm = new OrderForm('order', cloneTemplate(formOrderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactFormTemplate), events);
const successForm = new SuccessForm('order-success', cloneTemplate(confirmationTemplate), {
	onClick: () => modal.close(),
});

// Обработка изменений каталога товаров
events.on('catalog:changed', () => {
	page.catalog = appData.catalog.map((product) => {
		const card = new Card('card', cloneTemplate(productTemplateCatalog), {
			onClick: () => events.emit('card:select', product),
		});
		return card.render({
			title: product.title,
			image: product.image,
			price: product.price,
			category: product.category,
		});
	});
});

// Обработка выбора карточки товара
events.on('card:select', (product: Product) => {
	page.locked = true;
	const productItemPreview = new CardPreview(cloneTemplate(previewCardTemplate), {
		onClick: () => {
			if (product.selected) {
				events.emit('basket:removeFromBasket', product);
				modal.close();
			} else {
				events.emit('card:addToBasket', product);
				modal.close();
			}
			productItemPreview.updateButton(product.selected);
		},
	});

	productItemPreview.updateButton(product.selected);

	modal.render({
		content: productItemPreview.render({
			id: product.id,
			title: product.title,
			image: product.image,
			category: product.category,
			description: product.description,
			price: product.price,
			selected: product.selected,
		}),
	});
});

// Добавление товара в корзину
events.on('card:addToBasket', (product: Product) => {
	appData.addToBasket(product);
	product.selected = true;
	page.counter = appData.getCountProductInBasket();
});

// Удаление товара из корзины
events.on('basket:removeFromBasket', (product: Product) => {
	appData.removeFromBasket(product);
	product.selected = false;
	basket.total = appData.getTotalBasketPrice();
	page.counter = appData.getCountProductInBasket();
	const basketItems = appData.basket.map((item, index) => {
		const productItem: ProductItemBasket = new ProductItemBasket(
			'card',
			cloneTemplate(productItemTemplate),
			{
				onClick: () => events.emit('basket:removeFromBasket', item),
			}
		);
		return productItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render({
			list: basketItems,
			total: appData.getTotalBasketPrice(),
		}),
	});
	if (appData.getCountProductInBasket() == 0) {
		basket.toggleButton(true);
	}
});

// Открытие корзины
events.on('basket:open', () => {
	page.locked = true;
	const basketItems = appData.basket.map((item, index) => {
		const productItem: ProductItemBasket = new ProductItemBasket(
			'card',
			cloneTemplate(productItemTemplate),
			{
				onClick: () => events.emit('basket:removeFromBasket', item),
			}
		);
		return productItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render({
			list: basketItems,
			total: appData.getTotalBasketPrice(),
		}),
	});
});

// Открытие формы заказа
events.on('basket:order', () => {
	modal.render({
		content: orderForm.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// Обработка изменений полей оплаты заказа
events.on('order.payment:change', (data: { field: keyof IPaymentFormUI; value: string }) => {
	appData.setOrderFields(data.field, data.value);
});

// Обработка изменений адреса заказа
events.on('order.address:change', (data: { field: keyof IOrderValidate; value: string }) => {
	appData.setOrderFields(data.field, data.value);
});

// Обработка изменений email для контактов
events.on('contacts.email:change', (data: { field: keyof IContactsFormUI; value: string }) => {
	appData.setOrderFields(data.field, data.value);
});

// Обработка изменений телефона для контактов
events.on('contacts.phone:change', (data: { field: keyof IContactsFormUI; value: string }) => {
	appData.setOrderFields(data.field, data.value);
});

// Обработка ошибок в форме заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderValidate>) => {
	const { payment, address } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Подтверждение заказа
events.on('order:submit', () => {
	appData.order.total = appData.getTotalBasketPrice();
	appData.addProductsToOrder();
	modal.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
		}),
	});
});

// Обработка ошибок в форме контактов
events.on('contactsFormErrors:change', (errors: Partial<IContactsFormUI>) => {
	const { email, phone } = errors;
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Отправка данных на сервер и обработка успешного заказа
events.on('contacts:submit', () => {
	api
		.createOrder(appData.order)
		.then((res) => {
			events.emit('order:success', res);
			appData.clearBasket();
			appData.clearOrder();
			page.counter = 0;
			appData.resetSelected();
			orderForm.clear();
			contactsForm.clear();
		})
		.catch((err) => {
			console.log(err);
		});
});

// Обработка успешного заказа
events.on('order:success', (res: IOrderResult) => {
	modal.render({
		content: successForm.render({
			description: res.total,
		}),
	});
});

// Получение списка продуктов
api
	.getProductList()
	.then((res) => appData.setCatalog(res))
	.catch((error) => {
		console.log(error);
	});
