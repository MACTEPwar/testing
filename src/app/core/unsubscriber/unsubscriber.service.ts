import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class UnsubscriberService {
    private subscriptions: Array<Subscription> = new Array<Subscription>();

    constructor() {}

    public add(subscription: Array<Subscription> | Subscription): void {
        let subscriptionsArray: Array<Subscription> = [];
        if (!Array.isArray(subscription)) {
            subscriptionsArray = [subscription];
        } else {
            subscriptionsArray = [...subscription];
        }
        this.subscriptions.push(...subscriptionsArray);
    }

    public unsubscribeAll(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
}
