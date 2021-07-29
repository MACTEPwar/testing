export interface ToggleableWindowContext<T> {
    data?: T;
    resolve(...args: any[]): void;
    reject(reason?: any): void;
}