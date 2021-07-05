import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tab } from "../../types/tab";

@Injectable()
export class TabService{
    public tabs: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>(new Array<Tab>({
        active: true,
        canClose: false,
        name: 'Dashboard',
        url: '/'
    }));

    /**
     * Открыть таб
     * @param tab Таб
     */
    public add(tab: Tab): void {
        this.tabs.next(this.tabs.getValue().concat([tab]))
    }

    /**
     * Закрыть таб
     * @param tab Таб
     */
    public close(tab: Tab): void;
    /**
     * Закрыть таб
     * @param url Url
     */
    public close(url: string): void;
    public close(options: Tab | string): void {
        const ID: string = options instanceof Tab ? options.url : options;
        const TABS = this.tabs.getValue();
        this.tabs.next(TABS.filter(f => f.url !== ID))
    }
}