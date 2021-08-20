import { ButtonOptions } from './../../ui-components/toolbar/options/button-options';
import { Directive, Injector } from '@angular/core';
import { TablePartialBaseDirective } from '../a-table-partial-base.directive';
import { TableService } from '../table.service';
@Directive()
export abstract class ACatalogTablePartialBase extends TablePartialBaseDirective {
  constructor(protected injector: Injector) {
    super(injector);
  }

  protected setDefaultToolbar() {
    this.toolbarService
      .addButton(
        new ButtonOptions('create').setName('Create').setHandler(() => {
          this.showCreateView();
        })
      )
      .addButton(
        new ButtonOptions('update').setName('Update').setHandler(() => {
          alert('Im is update btn');
        })
      )
      .addButton(
        new ButtonOptions('filter').setName('filter').setHandler(() => {
          this.filterIsShowed = !this.filterIsShowed;
        })
      );
  }
}
