import { TableService } from "./table.service";

export abstract class TablePartialBase {
  headers;
  data;

  constructor(private tableService: TableService) {
      this.headers = this.tableService.headers;
      this.data = this.tableService.data;

      this.tableService.getData();
      this.tableService.getHeaders();
  }
}
