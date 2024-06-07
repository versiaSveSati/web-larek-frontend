interface EventEmitter {
    on(event: string, listener: Function): void;
    off(event: string, listenerToRemove: Function): void;
    emit(event: string, data?: any): void;
}