import { MainMenuService } from './../main-menu/services/concrete/main-menu.service';
import { BankPartialModule } from './../../features/partial-view/bank-partial/bank-partial.module';
import { BankPartialComponent } from './../../features/partial-view/bank-partial/bank-partial.component';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../../types/tab';

@Injectable()
export class TabService {
  currentTab: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(null);

  ASSOCC_COMPONENTS: Map<string, any> = new Map<string, Type<any>>([
    ['/catalogs/banks', BankPartialComponent],
  ]);

  constructor(private mainMenuService: MainMenuService) {}

  public tabs: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>(
    new Array<Tab>({
      id: 'Dashboard',
      name: 'Dashboard',
      active: true,
      canClose: false,
    })
  );

  /**
   * Открыть таб
   * @param tab Таб
   */
  public open(tab: Tab): void {
    const curTabs = this.tabs.getValue();
    const ifTabExist = curTabs.findIndex((f) => f.id === tab.id) ?? null;
    if (ifTabExist !== -1) {
      this.activateTab(ifTabExist);
    } else {
      this.create(tab);
    }
  }

  public activateTab(index: number): void {
    this.tabs.next(
      this.tabs.getValue().map((m, ind) => {
        m.active = ind === index ? true : false;
        return m;
      })
    );

    this.refreshCurrentTab();
  }

  public drop(index: number): void {
    let curTabs = this.tabs.getValue();
    curTabs = curTabs.filter((f, i) => i !== index);
    curTabs.forEach((tab) => {
      tab.active = false;
    });
    if (curTabs[index]) {
      curTabs[index].active = true;
    } else {
      curTabs[index - 1].active = true;
    }
    this.tabs.next(curTabs);
  }

  private create(tab: Tab): void {
    tab.component = this.ASSOCC_COMPONENTS.get(tab.id);
    tab.active = tab.active ?? true;
    tab.canClose = tab.canClose ?? true;
    tab.name = this.mainMenuService.getItem('url', tab.id).name;
    this.tabs.next([
      ...this.tabs.getValue().map((m) => {
        m.active = false;
        return m;
      }),
      tab,
    ]);

    this.refreshCurrentTab();
  }

  private refreshCurrentTab(): void {
    this.currentTab.next(this.tabs.getValue().find((f) => f.active === true));
  }
}
