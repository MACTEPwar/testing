import { HttpClient } from '@angular/common/http';
import {
  Injector,
  StaticProvider,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '../../core/configuration/configuration.service';
import { GqlQueryBuilderService } from '../../core/gql-query-builder/services/gql-query-builder.service';
import {
  GqlQueryService,
  ISelectOperation,
} from '../../core/gql-query-builder/services/gql-query.service';
import { ESortType, Filter, FilterItem, IFilterItem } from '../../types/filter';

/**
 * Сервис для связи с сервером
 */
export abstract class TableHttpService {
  protected gqlQueryBuilderService: GqlQueryBuilderService;
  protected httpClient: HttpClient;
  protected configurationService: ConfigurationService;

  /** Имя модели с маленькой буквы */
  protected get lowerModelName(): string {
    return this.modelName[0].toLowerCase() + this.modelName.slice(1);
  }

  /**
   * Создает новый сервис для связи с сервером
   * @constructor
   * @param {string} modelName Имя модели
   * @param {Injector} injector Инжектор
   */
  constructor(public modelName: string, injector: Injector) {
    this.setServicesFromDI(injector);
  }

  /**
   * Отправляет запрос на получение данных с сервера
   * @param {Filter} [filter = null] фильтр
   * @returns {Observable<T>} Массив данных
   */
  getData<T = any>(filter: Filter = null): Observable<T> {
    const selection = this.query().select('*').from(this.modelName);
    return this.addFilter2QuerySelection(selection, filter).build().execute();
  }

  /**
   * Отправляет запрос на получение количества данных с сервера
   * @param {Filter} [filter = null] Фильтр
   * @returns {Observable<any>} Количество данных
   */
  getCount(filter: Filter = null): Observable<any> {
    const selection = this.query().select('*').from(this.modelName);
    return this.addFilter2QuerySelection(selection, filter).count().execute();
  }

  getHeaders(): Observable<any> {
    return this.query().getHeaders(this.modelName);
  }

  getClientSettings<T>(): Observable<any> {
    return this.query()
      .function(
        'item',
        {
          clientObject: `newtable.${this.modelName}`,
        },
        'ClientSettings',
        '*',
        ['clientSetting']
      )
      .execute()
      .pipe(
        map((m: any) => {
          if (m) {
            return {
              data: JSON.parse(m.data),
              id: m.id,
            };
          } else {
            return null;
          }
        })
      );
  }

  setClientSettings(data: any): Observable<any> {
    const model: {} = {
      id: data.id,
      data: JSON.stringify(data.data),
      clientObject: `newtable.${this.modelName}`,
    };

    return this.query()
      .mutation('saveItem', { item: model }, 'ClientSettings', null, '*', [
        'clientSetting',
      ])
      .execute();
  }

  public create<T = any>(
    items: any[],
    selectedFields: string = 'id',
    server: string = 'deafult'
  ): Observable<T> {
    return this.query()
      .mutation(
        'add',
        {
          model: items,
        },
        `${this.modelName}`,
        null,
        selectedFields,
        [this.lowerModelName]
      )
      .execute(server);
  }

  protected query(): GqlQueryService {
    return new GqlQueryService(
      this.gqlQueryBuilderService,
      this.httpClient,
      this.configurationService
    );
  }

  /**
   * Забирает с DI нужные сервисы
   * @param {Injector} injector инжектор
   */
  private setServicesFromDI(injector: Injector) {
    const former = setCurrentInjector(injector);

    this.gqlQueryBuilderService = injector.get(GqlQueryBuilderService, null);
    this.httpClient = injector.get(HttpClient, null);
    this.configurationService = injector.get(ConfigurationService, null);

    setCurrentInjector(former);
  }

  /**
   * Создает объект для дальнейшего перевода в gql сигнатуру
   * @param {ISelectOperation} selection генерация всей выборки {select('*').from(modelName)}
   * @param {Filter} [filter = null] текущий фильтр
   * @returns {ISelectOperation} сгенерированный объект для выборки
   */
  private addFilter2QuerySelection(
    selection: ISelectOperation,
    filter: Filter = null
  ): ISelectOperation {
    if (filter !== null) {
      if (filter.splitter?.filters?.length > 0) {
        filter.splitter.filters.forEach((f: IFilterItem) => {
          selection.where(
            new FilterItem(
              f.property,
              f.value,
              f.matchMode,
              f.type,
              f.parentObjectName
            )
          );
        });
      }
      if (filter.sort && filter.sort[0]) {
        selection.orderBy(
          filter.sort[0]?.field,
          filter.sort[0].sortType === ESortType.ASC ? 1 : -1
        );
      }
      if (filter.paging) {
        selection.top(filter.paging.skip ?? 0, filter.paging.take ?? 50);
      }
    }
    return selection;
  }
}

export class TableHttpServiceCreator<T extends TableHttpService> {
  constructor(
    private type: new (modelName: string, injector: Injector) => T,
    private modelName: string,
    private injector: typeof Injector
  ) {}

  getNewTableHttpServiceInjector(): StaticProvider {
    return {
      provide: this.type,
      deps: [this.injector],
      useFactory: (i: Injector): T => new this.type(this.modelName, i),
    };
  }
}
