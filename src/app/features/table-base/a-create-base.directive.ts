import { Directive, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CUBaseDirective } from './a-cu-base.directive';

@Directive()
export abstract class CreateBaseDirective extends CUBaseDirective {
    constructor(
        protected injector: Injector,
        protected server: string = 'default'
    ) {
        super(injector, server);
    }

    public create(): void {
        if (this.canCreate()) {
            this.createFunction().subscribe(
                (success) => this.onCreated(success),
                (error) => this.onErrorCreated(error)
            );
        } else {
            this.cantCreate();
        }
    }

    protected onCreated(success: any): any | void {
        this.showSuccessMessage();
        this.modalContext.resolve();
    }

    protected onErrorCreated(error: any): any | void {
        console.error('onErrorCreated --> ', error);
        this.showErrorMessage();
    }

    protected createFunction(): Observable<any> {
        return this.service.createItems(this.profileForm.value);
    }

    protected canCreate(): boolean {
        return this.profileForm.valid;
    }

    // TODO: locale
    protected showSuccessMessage(): void {
        this.notificationService.success('Элемент(-ы) успешно создан(-ы)');
    }

    protected showErrorMessage(): void {
        this.notificationService.error('Ошибка создания элемента(-ов)');
    }

    protected cantCreate(): void {
        this.notificationService.error('Форма не валидна');
    }
}
