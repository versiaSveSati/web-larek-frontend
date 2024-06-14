import './scss/styles.scss';

import { api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { ProductComponent } from './components/ProductComponent';
import { ProductView } from './types/view';

const emitter = new EventEmitter();

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        api.fetchData<ProductView[]>('/products') 
            .then(products => {
                products.forEach((product: ProductView) => {
                    const productComponent = new ProductComponent(emitter, product);
                    app.appendChild(productComponent.getElement());
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
});
