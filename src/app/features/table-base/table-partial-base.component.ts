import {
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { ToolbarButtonItem } from '../ui-components/toolbar/models/concrete/toolbar-button-item-options';
import { EWindowType } from '../window/e-window-type';
import { WindowService } from '../window/window.service';
import { AlertOptions } from '../window/windows/alert-window/alert-options';
import {
  EFilterType,
  ESortType,
  Filter,
  FilterAnd,
  FilterItem,
  ISortItem,
  Paging,
} from './../../types/filter';
import { TableService } from './table.service';

export abstract class TablePartialBase {
  headers;
  data;
  count;
  isLoading;
  // filters: { codeM: FilterMetadata } = {
  //   codeM: { matchMode: 'contains', value: '1' },
  // };
  filters = {};
  constants;
  clientSettings;
  toolbarItems;
  filterIsShowed;

  protected windowService: WindowService;

  constructor(protected tableService: TableService, protected injector: Injector) {
    this.setServicesFromDI(injector);
    this.headers = this.tableService.headers;
    this.data = this.tableService.data;
    this.count = this.tableService.count;
    this.constants = this.tableService.constants;
    this.isLoading = this.tableService.isLoading;
    this.clientSettings = this.tableService.clientSettings;

    // this.tableService.getData();
    this.tableService.getHeaders();

    // setInterval(() => {
    //   let a = this.headers
    //     .getValue()
    //     .map((m) => ({ property: m.property, offsetWidth: m.offsetWidth }));
    //   console.log(a);
    // }, 1000);
    this.setDefaultToolbar();
  }

  setDefaultToolbar() {
    const onFilterClick: () => void = () => {
      this.filterIsShowed = !this.filterIsShowed;
    };
    const onTest: () => void = () => {
      this.windowService.openWindow(
        EWindowType.ALERT,
        new AlertOptions('asd', 'asd2')
      );
    };

    this.toolbarItems = [
      new ToolbarButtonItem('create', 'Toolbar.create', null, onTest),
      new ToolbarButtonItem('edit', 'Toolbar.edit', null, onTest),
      new ToolbarButtonItem('delete', 'Toolbar.delete', null, onTest),
      new ToolbarButtonItem('filter', 'Toolbar.filter', null, onFilterClick),
    ];
  }

  getData(event) {
    this.tableService.getData(this.primeFilter2LogicFilter(event));
  }

  onColToggleHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: oldSettings.data.map((m) => {
        if (event.find((f) => f.property === m.property)) {
          m.isShow = true;
        } else {
          m.isShow = false;
        }
        return m;
      }),
    });
  }

  onColResizeHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    oldSettings.data.find((f) => f.property === event.property).offsetWidth =
      event.offsetWidth;
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: oldSettings.data,
    });
  }

  onColReorderHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    let newSettings = [];
    event.columns.forEach((column) => {
      newSettings.push(
        oldSettings.data.find((f) => f.property === column.property)
      );
    });
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: newSettings.concat(
        oldSettings.data.filter((f) => f.isShow === false)
      ),
      // data: newSettings,
    });
  }

  private primeFilter2LogicFilter(event: any): Filter {
    const filterAnd = new FilterAnd();
    if (event?.filters !== null && event?.filters !== undefined) {
      Object.entries(event.filters).forEach((filter: any) => {
        if (
          filter[1].value !== null &&
          filter[1].value !== undefined &&
          filter[1].value !== ''
        ) {
          filterAnd.filters.push(
            new FilterItem(
              filter[0],
              filter[1].value,
              filter[1].matchMode,
              filter[1].matchMode === 'eq' ? EFilterType.BOOLEAN : null
            )
          );
        }
      });
    }
    let sort: ISortItem[] = null;
    if (event.sortField && event.sortOrder) {
      sort = [
        {
          field: event.sortField,
          sortType: event.sortOrder === 1 ? ESortType.ASC : ESortType.DESC,
        },
      ];
    }
    let filter = new Filter(
      filterAnd,
      new Paging(event.first, event.rows),
      sort
    );
    console.log(filter);
    return filter;
  }

  /**
   * Сетит сервисы с инжектора
   * @param injector Инжектор компонента
   */
  private setServicesFromDI(injector: Injector): void {
    const former = setCurrentInjector(injector);

    this.windowService = injector.get(WindowService, null);

    setCurrentInjector(former);
  }
}
