import { BehaviorSubject } from 'rxjs';
import { ButtonComponent } from './components/button/button.component';
import { SplitterComponent } from './components/splitter/splitter.component';
import { IToolbarItem } from './i-toolbar-item';
import { ButtonOptions } from './options/button-options';
import { SplitterOptions } from './options/splitter-options';

export class ToolbarBuilder {
  toolbarItems: BehaviorSubject<IToolbarItem[]> = new BehaviorSubject<
    IToolbarItem[]
  >([]);

  addButton(options: ButtonOptions): void {
    const obj: IToolbarItem = {
      component: ButtonComponent,
      options,
    };
    this.toolbarItems.next([...this.toolbarItems.getValue(), obj]);
  }

  addSplitter(options: SplitterOptions): void {
    const obj: IToolbarItem = {
      component: SplitterComponent,
      options,
    };
    this.toolbarItems.next([...this.toolbarItems.getValue(), obj]);
  }
}
