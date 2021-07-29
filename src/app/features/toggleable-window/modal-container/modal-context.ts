import {
    Injectable,
    ComponentRef,
    ViewContainerRef,
    Type,
} from '@angular/core';
import { ToggleableWindowContext } from '../toggleable-window-context';

@Injectable()
export class ModalContext<T> implements ToggleableWindowContext<T> {
    private componentRef: ComponentRef<Type<any>>;
    private containerRef: ViewContainerRef;

    data?: T;

    // tslint:disable-next-line:variable-name
    private _resolve: (...args: any[]) => void;
    // tslint:disable-next-line:variable-name
    private _reject: (reason: any) => void;
    // tslint:disable-next-line:variable-name
    private _promise: Promise<any>;

    constructor() {}

    private hide(): void {
        this.containerRef.remove(
            this.containerRef.indexOf(this.componentRef.hostView)
        );
    }

    /**
     * Положительный вариант
     * @param args параметры ответа
     */
    resolve(...args: any[]): void {
        this.hide();
        this._resolve(...args);
    }

    /**
     * Отрицательный вариант
     * @param reason параметры ответа
     */
    reject(reason?: any): void {
        this.hide();
        this._reject(reason);
    }

    private promise(
        componentRef: ComponentRef<Type<any>>,
        containerRef: ViewContainerRef
    ): Promise<any> {
        return (
            this._promise ||
            (this._promise = new Promise((resolve, reject) => {
                this.componentRef = componentRef;
                this.containerRef = containerRef;
                this._resolve = resolve;
                this._reject = reject;
            }))
        );
    }
}
