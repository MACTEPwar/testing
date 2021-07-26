import {
  ESortType,
  Filter,
  FilterAnd,
  FilterItem,
  ISortItem,
  Paging,
} from './../../types/filter';
import { FilterMetadata } from 'primeng/api';
import { TableService } from './table.service';

export abstract class TablePartialBase {
  headers;
  data;
  count;
  isLoading;
  filters: { codeM: FilterMetadata } = {
    codeM: { matchMode: 'contains', value: '1' },
  };
  constants;
  clientSettings;

  constructor(private tableService: TableService) {
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

  private generateObjectForSaveClientSettings() {}

  private primeFilter2LogicFilter(event: any): Filter {
    const filterAnd = new FilterAnd();
    if (event.fitlers) {
      Object.entries(event.filters).forEach((filter: any) => {
        filterAnd.filters.push(
          new FilterItem(filter[0], filter[1].value, filter[1].matchMode)
        );
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
    console.log(event);
    console.log(sort);
    return new Filter(filterAnd, new Paging(event.first, event.rows), sort);
  }
}
