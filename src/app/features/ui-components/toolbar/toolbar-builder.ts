import { Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonComponent } from './components/button/button.component';
import { SplitterComponent } from './components/splitter/splitter.component';
import { IToolbarItem } from './i-toolbar-item';
import { BaseOptions } from './options/base-options';

export class ToolbarBuilder {
  toolbarItems: BehaviorSubject<IToolbarItem[]> = new BehaviorSubject<
    IToolbarItem[]
  >([]);

  assoc = new Map<ETolbarItemType, Type<any>>([
    [ETolbarItemType.BUTTON, ButtonComponent],
    [ETolbarItemType.SPLITTER, SplitterComponent],
  ]);

  createItem(type: ETolbarItemType, options: BaseOptions): void {
    const obj: IToolbarItem = {
      component: this.assoc.get(type),
      options,
    };

    this.toolbarItems.next([...this.toolbarItems.getValue(), obj]);
  }
}

export enum ETolbarItemType {
  BUTTON,
  SPLITTER,
}
