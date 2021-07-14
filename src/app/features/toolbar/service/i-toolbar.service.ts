import { BehaviorSubject } from 'rxjs';

export interface IToolbarService {
  // items: BehaviorSubject<Array<IToolbarItem>>;
  items: BehaviorSubject<Array<any>>;
  addItem(item: any, ind: number): void;
  changeOptions(id: string, options: any): void;
  showItem(id: string): this;
  hideItem(id: string): this;
}
