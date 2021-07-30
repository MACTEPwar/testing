import { Directive, Injector } from '@angular/core';
import { TablePartialBaseDirective } from '../table-partial-base.component';
import { TableService } from '../table.service';
@Directive()
export abstract class CatalogTablePartialBase extends TablePartialBaseDirective {
  constructor(
    protected tableService: TableService,
    protected injector: Injector
  ) {
    super(tableService, injector);
  }
}
