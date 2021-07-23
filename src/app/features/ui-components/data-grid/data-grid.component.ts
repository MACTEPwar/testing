import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  private _headers;

  public get headers(): any {
    return this._headers;
  }

  @Input() public set headers(value: any) {
    value = value.map(m => {
      return m;
    })
    this._headers = value;
    this.selectedColumns = value;
  }

  private _data = [];

  public get data(): any {
    return this._data;
  }

  @Input() public set data(value: any) {
    this._data = value;
    this.makeRowsSameHeight();
  }

  private _selectedColumns: any[];

  public set selectedColumns(value: any[]) {
    this._selectedColumns = this.headers.filter((col) => value.includes(col));
    this.makeRowsSameHeight();
  }

  public get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  @Input() lazy: boolean = true;
  @Input() paginator: boolean = true;
  @Input() rows: number = 100;
  @Input() totalRecords: number = 5;
  @Input() loading: boolean;
  @Input() rowsPerPageOptions: any;
  @Input() selectionMode: 'multiple' | 'single' = 'multiple';
  @Input() scrollable: boolean = true;
  @Input() style: any = { width: '100%' };
  @Input() lazyLoadOnInit: boolean = false;
  @Input() showCurrentPageReport: boolean = true;
  @Input() resizableColumns: boolean = true;
  @Input() reorderableColumns: boolean = true;
  @Input() rowHover: boolean = true;
  @Input()
  currentPageReportTemplate: string = `с {first} по {last} из {totalRecords} записей`;
  @Input() selection: any;
  @Input() filters: any;
  @Input() filterIsShowed = false;
  @Input() constants;
  @Input() columnResizeMode = 'expand';
  // @Input() clientSettings;

  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColResize: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColReorder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.refreshTable();
  }

  onColResizeHandler(event): void {
    event.offsetWidth = event.element.offsetWidth;
    event.property = event.element.getAttribute('data-property');
    this.headers.find(f => f.property === event.property).offsetWidth = event.offsetWidth;
    let selectedFinder = this.selectedColumns.find(f => f.property === event.property);
    if (selectedFinder) {
      selectedFinder.offsetWidth = event.offsetWidth;
    }
    this.onColResize.emit(event);
    this.makeRowsSameHeight();
  }

  setOrderForHeaders(visibleAndOrder: any[]): void{
    this.headers = visibleAndOrder.concat(this.headers.filter(f => !visibleAndOrder.includes(f)));;
    
  }

  onColReorderHandler(event): void {
    this._selectedColumns = event.columns;
    this.setOrderForHeaders(event.columns);
    this.onColReorder.emit(event);
  }

  exportPdf() {
    const doc: any = new jsPDF();
    doc.autoTable(
      this.headers.map((m) => m.property),
      this.data
        .map((m) => Object.entries(m))
        .map((m) => {
          return m.reduce((acc, curr) => {
            acc.push(curr[1]);
            return acc;
          }, []);
        })
    );
    doc.save('products.pdf');
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    let url = window.URL.createObjectURL(data);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  refreshTable(): void {
    this.onLazyLoad.emit({
      first: 0,
      rows: this.rows,
    });
  }

  makeRowsSameHeight() {
    setTimeout(() => {
      if (
        document.getElementsByClassName('p-datatable-scrollable-wrapper').length
      ) {
        let wrapper = document.getElementsByClassName(
          'p-datatable-scrollable-wrapper'
        );
        for (var i = 0; i < wrapper.length; i++) {
          let w = wrapper.item(i) as HTMLElement;
          let frozen_rows: any = w.querySelectorAll(
            '.p-datatable-frozen-view tr'
          );
          let unfrozen_rows: any = w.querySelectorAll(
            '.p-datatable-unfrozen-view tr'
          );
          for (let i = 0; i < frozen_rows.length; i++) {
            if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
              unfrozen_rows[i].style.height =
                frozen_rows[i].clientHeight + 'px';
            } else if (
              frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight
            ) {
              frozen_rows[i].style.height =
                unfrozen_rows[i].clientHeight + 'px';
            }
          }
        }
      }
    });
  }
}
