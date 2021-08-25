import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToolbarItem } from './i-toolbar-item';
import { ETolbarItemType, ToolbarBuilder } from './toolbar-builder';
import { ButtonOptions } from './options/button-options';
import { SplitterOptions } from './options/splitter-options';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class ToolbarService {
  items: BehaviorSubject<IToolbarItem[]> = new BehaviorSubject<IToolbarItem[]>(
    []
  );
  toolbarBuilder: ToolbarBuilder;

  constructor() {
    this.toolbarBuilder = new ToolbarBuilder();
    this.toolbarBuilder.toolbarItems.subscribe((items) =>
      this.items.next(items)
    );
  }

  addButton(options: ButtonOptions): this {
    this.toolbarBuilder.createItem(ETolbarItemType.BUTTON, options);
    return this;
  }

  addSplitter(options: SplitterOptions): this {
    this.toolbarBuilder.createItem(ETolbarItemType.SPLITTER, options);
    return this;
  }

  changeOption(id: string, key: string, value: any): void {
    const curr = this.items.getValue();
    const finderItem = curr.find((f) => f.options.id === id);
    if (finderItem && finderItem.options[key]) {
      finderItem.options[key] = value;
    }
  }
}
