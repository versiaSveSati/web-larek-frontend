
export interface View {
    render(): void;
}

export interface ProductView extends View {
    render(): void;
}

export interface CartView extends View {
    render(): void;
}
