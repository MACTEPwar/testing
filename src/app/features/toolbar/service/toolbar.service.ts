import { BehaviorSubject } from 'rxjs';
import { IToolbarService } from './i-toolbar.service';

export class ToolbarService implements IToolbarService {
  // items: BehaviorSubject<Array<IToolbarItem>>;
  // private array: any;
  public items: BehaviorSubject<Array<any>>;

  constructor() {
    this.items = new BehaviorSubject<Array<any>>([]);
  }

  public addItem(item: any, ind: number = null): void {
    if (!this.items?.getValue().find((f) => f.id === item.id)) {
      if (ind) {
        let arr = this.items?.getValue() || [];
        arr.splice(ind, 0, item);
        this.items.next([...arr]);
      } else {
        this.items.next([...(this.items?.getValue() || []), item]);
      }
    }
  }

  public changeOptions(id: string, options: any): void {
    const FINDER = this.items?.getValue().find((f) => f.id === id);
    if (FINDER) {
      Object.entries(options).forEach((option) => {
        if ((FINDER as object).hasOwnProperty(option[0])) {
          FINDER[option[0]] = option[1];
        }
      });
      // Object.assign(FINDER, options);
      // this.items.next([...this.items?.getValue()]);
    }
  }

  public showItem(id: string): this {
    this.changeOptions(id, {
      isVisible: true,
    });
    return this;
  }

  public hideItem(id: string): this {
    this.changeOptions(id, {
      isVisible: false,
    });
    return this;
  }
}
