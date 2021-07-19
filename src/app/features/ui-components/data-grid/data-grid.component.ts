import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  private _headers;

  public get headers() : any {
    return this._headers;
  }

  @Input() public set headers(value: any) {
    this._headers = value;
    this.makeRowsSameHeight();
  }  

  @Input() data = [];
  @Input() lazy: boolean = true;
  @Input() paginator: boolean = true;
  @Input() rows: number = 50;
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
  @Input() columnResizeMode = 'expand'

  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColResize: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColReorder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.refreshTable();
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
