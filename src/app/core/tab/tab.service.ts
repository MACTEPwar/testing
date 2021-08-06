import { BankPartialComponent } from './../../features/partial-view/bank-partial/bank-partial.component';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../../types/tab';

@Injectable()
export class TabService {
  ASSOCC_COMPONENTS: Map<string, Type<any>> = new Map<string, Type<any>>([
    ['Bank', BankPartialComponent],
  ]);

  constructor(private router: Router) {}

  public tabs: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>(
    new Array<Tab>({
      id: 'Dashboard',
      name: 'Dashboard',
      active: true,
      canClose: false,
    })
  );

  // public activeTabIndex: BehaviorSubject<number> = new BehaviorSubject<number>(
  //   0
  // );

  /**
   * Открыть таб
   * @param tab Таб
   */
  public open(tab: Tab): void {
    const curTabs = this.tabs.getValue();
    const ifTabExist = curTabs.findIndex((f) => f.id === tab.id) ?? null;
    if (ifTabExist !== -1) {
      this.activateTab(ifTabExist)
      // this.activeTabIndex.next(curTabs.findIndex((f) => f.id === tab.id));
    } else {
      this.create(tab);
      // this.activeTabIndex.next(
      //   this.tabs.getValue().findIndex((f) => f.id === tab.name)
      // );
    }
    // tab.component = this.ASSOCC_COMPONENTS.get(tab.id);
    // tab.name = tab.id;
    // this.tabs.next([
    //   ...this.tabs.getValue().map((m) => {
    //     m.active = false;
    //     return m;
    //   }),
    //   tab,
    // ]);
  }

  public activateTab(index: number): void {
    this.tabs.next(this.tabs.getValue().map((m,ind) => {
      m.active = ind === index ? true : false;
      return m;
    }))
  }

  public drop(index: number): void {
    let curTabs = this.tabs.getValue();
    curTabs = curTabs.filter((f,i) => i !== index);
    // this.tabs.next(curTabs.filter((f,i) => i !== index));
    curTabs.forEach(tab => {
      tab.active = false;
    });
    if (curTabs[index]) {
      curTabs[index].active = true;
    } else{
      curTabs[index - 1].active = true;
    }
    this.tabs.next(curTabs);
  }

  private create(tab: Tab): void {
    tab.component = this.ASSOCC_COMPONENTS.get(tab.id);
    tab.active = tab.active ?? true;
    tab.canClose = tab.canClose ?? true;
    tab.name = tab.id;
    this.tabs.next([
      ...this.tabs.getValue().map((m) => {
        m.active = false;
        return m;
      }),
      tab,
    ]);
  }
}
