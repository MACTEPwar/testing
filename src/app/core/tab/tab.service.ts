import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../../types/tab';

@Injectable()
export class TabService {
  constructor(private router: Router) {}

  public tabs: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>(
    new Array<Tab>({
      active: true,
      canClose: false,
      name: 'Dashboard',
      url: '/',
    })
  );

  /**
   * Открыть таб
   * @param tab Таб
   */
  public add(tab: Tab, isAddAndOpen = true): void {
    let existTab = this.tabs.getValue().find((f) => f.url === tab.url);
    if (existTab) {
      this.changeTabActivity(existTab, true);
    } else {
      this.tabs.next(this.tabs.getValue().concat([tab]));
    }
    if (isAddAndOpen) {
        this.router.navigate([tab.url]);
    }
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
    const ID: string = typeof options === 'object' ? options.url : options;
    const TABS = this.tabs.getValue();
    const newTabs = [...TABS.filter((f) => f.url !== ID)];
    this.tabs.next(newTabs);
    this.router.navigate([newTabs[newTabs.length - 1].url]);
  }

  /**
   * Изменяет активность таба
   * @param tab таб
   * @param state активность (true по стандарту)
   */
  public changeTabActivity(tab: Tab, state = true): void {
    this.disabledAllTabs();
    tab.active = state;
  }

  /**
   * Снимает активность со всех табов
   */
  public disabledAllTabs(): void {
    this.tabs.next([
      ...this.tabs.getValue().map((m) => {
        m.active = false;
        return m;
      }),
    ]);
  }
}
