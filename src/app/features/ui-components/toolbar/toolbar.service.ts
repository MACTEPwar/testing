import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToolbarItem } from './models/interfaces/i-toolbar-item';

@Injectable()
export class ToolbarService {

  items: BehaviorSubject<IToolbarItem[]> = new BehaviorSubject<IToolbarItem[]>([]);

  constructor() { }

  setItems(items: IToolbarItem[]): void {
    this.items.next(items);
  }
}
