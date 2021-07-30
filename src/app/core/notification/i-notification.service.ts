import { Observable } from 'rxjs';

export interface INotificationService {
    getAlert(): Observable<any>;
    success(options: INotificationOptions): void;
    success(options: string): void;
    error(options: INotificationOptions): void;
    error(options: string): void;
    warn(options: INotificationOptions): void;
    warn(options: string): void;
    clear(): void;
}

export interface INotificationOptions {
    /**
     * @param message (detail) тело уведомления
     */
    message: string;

    /**
     * @param title (summary) заголовок уведомления
     */
    title?: string;

    /**
     * @param keepAfterRouteChange сохранять уведомления при переходе между табами
     */
    keepAfterRouteChange?: boolean;

    /**
     * @param life время жизни уведомления в секундах
     */
    life?: number;

    /**
     * @param closable можно ли закрыть уведомление
     */
    closable?: boolean;

    /**
     * @param sticky закреплять ли уведомления
     */
    sticky?: boolean;
}
