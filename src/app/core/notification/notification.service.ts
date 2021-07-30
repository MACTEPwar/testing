import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import {
    INotificationOptions,
    INotificationService,
} from './i-notification.service';

@Injectable()
export class NotificationService implements INotificationService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(
        private router: Router,
        private messageService: MessageService
    ) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * Отобразить успешное уведомление
     * @param options
     */
    success(options: string): void;
    success(options: INotificationOptions): void;
    success(options: INotificationOptions | string): void {
        let opt: any = {};
        if (typeof options === 'string') {
            opt.message = options;
        }

        options = Object.assign(options, opt) as INotificationOptions;
        this._messageService(options, 'success');
    }

    /**
     * Отобразить ошибку в уведомление
     * @param options
     */
    error(options: string): void;
    error(options: INotificationOptions): void;
    error(options: INotificationOptions | string): void {
        let opt: any = {};
        if (typeof options === 'string') {
            opt.message = options;
        }

        options = Object.assign(options, opt) as INotificationOptions;
        options.sticky = true;
        this._messageService(options, 'error');
    }

    /**
     * Отобразить предупреждающее уведомление
     * @param options
     */
    warn(options: string): void;
    warn(options: INotificationOptions): void;
    warn(options: INotificationOptions | string): void {
        let opt: any = {};
        if (typeof options === 'string') {
            opt.message = options;
        }

        options = Object.assign(options, opt) as INotificationOptions;
        options.sticky = true;
        this._messageService(options, 'warn');
    }

    private _messageService(options: INotificationOptions, type: string) {
        this.keepAfterRouteChange = options?.keepAfterRouteChange ?? false;
        this.subject.next({ type, text: options.message });
        this.messageService.add(
            Object.assign(
                {
                    summary: options?.title ?? '',
                    severity: type,
                    detail: options.message,
                },
                options
            )
        );
    }

    clear(): void {
        this.subject.next();
    }
}
