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
  }

  getData(event) {
    this.tableService.getData(this.primeFilter2LogicFilter(event));
  }

  onColResizeHandler(event): void {
    console.log('onColResize', event);
    this.tableService.saveClientSettings(
      this.generateObjectForSaveClientSettings()
    );
  }

  onColReorderHandler(event): void {
    let allHeaders: any[] = this.tableService.headers.getValue();
    let visibleAndOrder: any[] = event.columns;

    // let arr = allHeaders
    //   .map((m, i) => ({ index: i, header: m }))
    //   .filter((f) => visibleAndOrder.includes(f.header));

    // let arr2 = visibleAndOrder.map(m => {
    //   let index = arr.find(f => f.header.property === m.property).index;
    //   return {
    //     index,
    //     header: m
    //   }
    // })

    // let arr3 = arr2.map(m => m.header);

    let arr4 = visibleAndOrder.map(m => {
      m.isShow = true;
      return m;
    }).concat(allHeaders.filter(f => !visibleAndOrder.includes(f)).map(m => {
      m.isShow = false;
      return m;
    }));

    // console.log('onColReorder', event);
    console.log('onColReorder', arr4);
    // this.tableService.saveClientSettings(
    //   this.generateObjectForSaveClientSettings()
    // );
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
    return new Filter(filterAnd, new Paging(event.first, event.rows));
  }
}
