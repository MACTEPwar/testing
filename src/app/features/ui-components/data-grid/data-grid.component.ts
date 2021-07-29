import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterMetadata, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { TableFilterService } from '../../table-filter/table-filter.service';
import { ToolbarButtonItem } from '../toolbar/models/concrete/toolbar-button-item-options';
import { IToolbarItem } from '../toolbar/models/interfaces/i-toolbar-item';
import { makeRowsSameHeight } from './helper';
import { DataGridService } from './data-grid.service';
import { WindowService } from '../../window/window.service';
import { EWindowType } from '../../window/e-window-type';
import { AlertOptions } from '../../window/windows/alert-window/alert-options';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  providers: [DataGridService],
})
export class DataGridComponent implements OnInit {
  private _headers;

  public get headers(): any {
    return this._headers;
  }

  @Input() public set headers(value: any) {
    console.log('headers', value);
    value = value.map((m) => {
      return m;
    });
    this._headers = value;
    this.selectedColumns = value.filter((f) => f.isShow);
  }

  private _data = [];

  public get data(): any {
    return this._data;
  }

  @Input() public set data(value: any) {
    this._data = value;
    makeRowsSameHeight();
  }

  private _selectedColumns: any[];

  public set selectedColumns(value: any[]) {
    this._selectedColumns = this.headers.filter((col) => value.includes(col));
    makeRowsSameHeight();
  }

  public get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  selectedItem;
  contextMenuItems: MenuItem[];

  @Input() lazy: boolean = true;
  @Input() paginator: boolean = true;
  @Input() rows: number = 100;
  @Input() totalRecords: number = 5;
  @Input() loading: boolean;
  @Input() rowsPerPageOptions: any = [5, 10, 25, 50, 100, 200];
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
  
  private _filterIsShowed: boolean = false;
  @Input() public set filterIsShowed(value: boolean) {
    this._filterIsShowed = value;
    makeRowsSameHeight();
  }
  public get filterIsShowed(): boolean {
    return this._filterIsShowed;
  }

  @Input() constants;
  @Input() columnResizeMode = 'expand';
  // @Input() clientSettings;

  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColResize: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColReorder: EventEmitter<any> = new EventEmitter<any>();
  @Output() onColToggle: EventEmitter<any> = new EventEmitter<any>();

  @Output() onToolbarChange: EventEmitter<IToolbarItem[]> = new EventEmitter<
    IToolbarItem[]
  >();

  @Input() toolbarItems: IToolbarItem[];

  constructor(
    private tableFilterService: TableFilterService,
    private dataGridService: DataGridService,
    private windowService: WindowService
  ) {
    // this.setDefaultToolbar();
  }

  ngOnInit(): void {
    this.refreshTable();
    this.setContextMenu();
  }

  // setDefaultToolbar() {
  //   const onFilterClick: () => void = () => {
  //     this.filterIsShowed = !this.filterIsShowed;
  //     makeRowsSameHeight();
  //   };
  //   const onTest: () => void = () => {
  //     this.windowService.openWindow(
  //       EWindowType.ALERT,
  //       new AlertOptions('asd', 'asd2')
  //     );
  //   };

  //   this.toolbarItems = [
  //     new ToolbarButtonItem('create', 'Toolbar.create', null, onTest),
  //     new ToolbarButtonItem('edit', 'Toolbar.edit', null, onTest),
  //     new ToolbarButtonItem('delete', 'Toolbar.delete', null, onTest),
  //     new ToolbarButtonItem('filter', 'Toolbar.filter', null, onFilterClick),
  //   ];
  // }

  setContextMenu() {
    this.contextMenuItems = [
      {
        label: 'item1',
        command: () => {
          console.log(this.selectedItem);
        },
      },
      { label: 'item2' },
    ];
  }

  /**
   * Очищает все фильтра
   * @param dt Объект праймовской таблицы
   */
  clearFilters(dt: Table): void {
    this.tableFilterService.clearFilter$.emit();
    Object.keys(dt.filters).forEach((dtKey) => {
      (dt.filters[dtKey] as FilterMetadata).value = null;
    });
    // dt.filteredValue = null;
    // dt.tableService.onResetChange();
    // dt.firstChange.emit(0);
    dt.onLazyLoad.emit(dt.createLazyLoadMetadata());
  }

  onColResizeHandler(event): void {
    event.offsetWidth = event.element.offsetWidth;
    event.property = event.element.getAttribute('data-property');
    this.headers.find((f) => f.property === event.property).offsetWidth =
      event.offsetWidth;
    let selectedFinder = this.selectedColumns.find(
      (f) => f.property === event.property
    );
    if (selectedFinder) {
      selectedFinder.offsetWidth = event.offsetWidth;
    }
    this.onColResize.emit(event);
    makeRowsSameHeight();
  }

  setOrderForHeaders(visibleAndOrder: any[]): void {
    this.headers = visibleAndOrder.concat(
      this.headers
        .filter((f) => !visibleAndOrder.includes(f))
        .map((m) => {
          m.isShow = false;
          return m;
        })
    );
  }

  onColReorderHandler(event): void {
    // this._selectedColumns = event.columns;
    this.setOrderForHeaders(event.columns);
    this.onColReorder.emit(event);
  }

  refreshTable(): void {
    this.onLazyLoad.emit({
      first: 0,
      rows: this.rows,
    });
  }
}
