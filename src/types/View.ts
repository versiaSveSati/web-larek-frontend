export interface ProductView {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    onAddToCart: (productId: string) => void;
}

export interface CartItemView {
    productId: string;
    quantity: number;
    onRemove: (productId: string) => void;
}

export interface CartView {
    items: CartItemView[];
    onCheckout: () => void;
}