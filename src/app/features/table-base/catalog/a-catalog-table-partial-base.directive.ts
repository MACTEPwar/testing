import { Directive, Injector } from '@angular/core';
import { TablePartialBaseDirective } from '../a-table-partial-base.directive';
import { TableService } from '../table.service';
import { ToolbarButtonItem } from '../../ui-components/toolbar/models/concrete/toolbar-button-item-options';
@Directive()
export abstract class CatalogTablePartialBase extends TablePartialBaseDirective {
  constructor(
    protected tableService: TableService,
    protected injector: Injector
  ) {
    super(tableService, injector);
  }

  protected setDefaultToolbar() {
    const onFilterClick: () => void = () => {
      this.filterIsShowed = !this.filterIsShowed;
    };

    this.toolbarItems = [
      new ToolbarButtonItem('create', 'Toolbar.create', null, () => {
        this.modalService.open(this.createComponent, {
          service: this.tableService,
        });
      }),
      new ToolbarButtonItem('edit', 'Toolbar.edit', null, this.showEditView),
      new ToolbarButtonItem(
        'delete',
        'Toolbar.delete',
        null,
        this.showDeleteView
      ),
      new ToolbarButtonItem('filter', 'Toolbar.filter', null, onFilterClick),
    ];
  }
}
