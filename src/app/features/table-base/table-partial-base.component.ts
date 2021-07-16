import { Filter, FilterAnd, FilterItem, Paging } from './../../types/filter';
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

  constructor(private tableService: TableService) {
    this.headers = this.tableService.headers;
    this.data = this.tableService.data;
    this.count = this.tableService.count;
    this.constants = this.tableService.constants;
    this.isLoading = this.tableService.isLoading;

    // this.tableService.getData();
    this.tableService.getHeaders();
  }

  getData(event) {
    this.tableService.getData(this.primeFilter2LogicFilter(event));
    console.log(event);
  }

  private primeFilter2LogicFilter(event: any): Filter {
    const filterAnd = new FilterAnd();
    if (event.fitlers) {
      Object.entries(event.filters).forEach((filter: any) => {
        filterAnd.filters.push(
          new FilterItem(filter[0], filter[1].value, filter[1].matchMode)
        );
      });
    }
    return new Filter(filterAnd, new Paging(event.first, event.rows));
  }
}
