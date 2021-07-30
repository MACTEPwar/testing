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
    this.data.next([]);
    this.isLoading.next(true);
    forkJoin([
      this.tableHttpService.getData(filter),
      this.tableHttpService.getCount(filter),
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
    this.tableHttpService.getClientSettings().subscribe((clientSettings) => {
      // clientSettings = JSON.parse(clientSettings.data);
      let headers: any = this.modelLoaderService.getModel(
        this.tableHttpService.modelName,
        'default'
      ).fields;

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
    console.log('CS', clientSettings);
    clientSettings.data.forEach((column) => {
      let col: any = headers.find((f) => f.property === column.property);
      col.isShow = column.isShow;
      col.offsetWidth = column.offsetWidth;
      newModel.push(col);
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
