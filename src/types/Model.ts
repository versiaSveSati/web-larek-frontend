
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    addItem(productId: string, quantity: number): void;
    removeItem(productId: string): void;
    getItems(): CartItem[];
    clear(): void;
}
