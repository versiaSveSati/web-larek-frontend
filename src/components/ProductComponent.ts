import { ProductView } from '../types/view';
import { EventEmitter } from './base/events';

export class ProductComponent {
    private emitter: EventEmitter;
    private product: ProductView;
    private element: HTMLDivElement;

    constructor(emitter: EventEmitter, product: ProductView) {
        this.emitter = emitter;
        this.product = product;
        this.element = document.createElement('div');
        this.render();
    }

    private render() {
        this.element.innerHTML = `
            <h2>${this.product.name}</h2>
            <p>${this.product.description}</p>
            <p>${this.product.price}</p>
            <img src="${this.product.imageUrl}" alt="${this.product.name}">
            <button>Add to Cart</button>
        `;
        
        const button = this.element.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                this.emitter.emit('addToCart', { productId: this.product.id });
            });
        }
    }

    public getElement() {
        return this.element;
    }
}