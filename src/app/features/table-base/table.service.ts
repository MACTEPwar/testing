import {
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { ModelLoaderService } from './../../core/models-loader/services/model-loader.service';
import { Filter } from './../../types/filter';
import { TableHttpService } from './a-table-http.service';
import { FilterAnd, FilterItem, EFilterType, ISortItem, ESortType, Paging } from '../../types/filter';

export abstract class TableService {
  modelLoaderService: ModelLoaderService;

  data: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    new Array()
  );

  headers: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    new Array()
  );
  constants: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    new Array()
  );

  clientSettings: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  count: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected beforeGetDataHandler: Function = () => {};
  protected afterGetDataHandler: Function = () => {};

  public get modelName(): string {
    return this.tableHttpService.modelName;
  }

  constructor(
    protected tableHttpService: TableHttpService,
    protected injector: Injector
  ) {
    this.setServicesFromDI(injector);

    // console.log('tst', injector);
    // console.log('tst2', this.modelLoaderService);
  }

  getData(filter: Filter = null): void {
    this.beforeGetDataHandler();
    this.isLoading.next(true);
    this.data.next([]);
    const logicFilter = this.primeFilter2LogicFilter(filter);
    forkJoin([
      this.tableHttpService.getData(logicFilter),
      this.tableHttpService.getCount(logicFilter),
    ])
      .pipe(
        tap((_) => {
          this.isLoading.next(false);
        })
      )
      .subscribe(([data, count]) => {
        this.data.next(data);
        this.count.next(count);
        this.afterGetDataHandler();
      });
  }

  getHeaders(): void {
    forkJoin([
      this.tableHttpService.getClientSettings(),
      this.tableHttpService.getHeaders(),
    ]).subscribe(([clientSettings, headers]) => {
      // clientSettings = JSON.parse(clientSettings.data);
      let headers2: any = this.modelLoaderService.getModel(
        this.modelName,
        'default'
      ).fields;

      console.log('HHHH', headers);
      console.log('HHHH', headers2);

      let changedHeaders = this.applayClientSettingsToHeaders(
        headers,
        clientSettings
      );
      // console.log(this.headers.getValue());
      // console.log(clientSettings);
      // console.log(model);
      this.headers.next(changedHeaders);
      this.constants.next(changedHeaders.filter((f) => f.kind === 'ENUM'));
    });
  }

  public saveClientSettings(data: any): void {
    this.tableHttpService
      .setClientSettings(data)
      .subscribe((clientSettings) => {
        data.id = clientSettings.id;
        this.clientSettings.next(data);
      });
  }

  /**
   * Созадет запрос на создание элемента
   * @returns Observable<any>
   */

  public createItems(item: any | any[]): Observable<any> {
    item = Array.isArray(item) ? item : [item];
    // return of();
    // return (this.service as any).create(item);
    return this.tableHttpService.create(item);
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
   * Устанавливает клиентские настрйоки дял хедеров
   * @param headers Хедеры
   * @param clientSettings Настройки с сервера
   * @returns Модифицированные хедеры
   */
  private applayClientSettingsToHeaders(
    headers: any[],
    clientSettings: any
  ): any[] {
    return clientSettings
      ? this.applayIncomingSettings(headers, clientSettings)
      : this.defaultClientSettings(headers);
  }

  /**
   * Устанавливает дефолтные настройки таблицы
   * @param headers Хедеры
   */
  private defaultClientSettings(headers: any[]): any[] {
    headers.map((m) => {
      m.isShow = true;
      m.offsetWidth = 200;
      return m;
    });
    this.clientSettings.next({
      data: headers.map((m) => ({
        property: m.property,
        isShow: m.isShow,
        offsetWidth: m.offsetWidth,
      })),
    });
    return headers;
  }

  /**
   * Применяет настройки с сервера к хедерам
   * @param headers Хедеры
   * @param clientSettings Настройки с БД
   */
  private applayIncomingSettings(headers: any[], clientSettings: any): any[] {
    this.clientSettings.next(clientSettings);
    let newModel = [];
    clientSettings.data.forEach((column) => {
      try {
        let col: any = headers.find((f) => f.property === column.property);
        col.isShow = column.isShow;
        col.offsetWidth = column.offsetWidth;
        newModel.push(col);
      } catch {}
    });
    return newModel;
  }

  /**
   * Сетит сервисы с инжектора
   * @param injector Инжектор компонента
   */
  private setServicesFromDI(injector: Injector): void {
    const former = setCurrentInjector(injector);

    this.modelLoaderService = injector.get(ModelLoaderService, null);

    setCurrentInjector(former);
  }
}
