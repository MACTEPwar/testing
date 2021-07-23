import { ConfigurationService } from './../../core/configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { GqlQueryBuilderService } from './../../core/gql-query-builder/services/gql-query-builder.service';
import {
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import {
  GqlQueryService,
  ISelectOperation,
} from './../../core/gql-query-builder/services/gql-query.service';
import { Filter, FilterItem, IFilterItem } from './../../types/filter';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export abstract class TableHttpService {
  protected gqlQueryBuilderService: GqlQueryBuilderService;
  protected httpClient: HttpClient;
  protected configurationService: ConfigurationService;

  constructor(protected modelName: string, injector: Injector) {
    const former = setCurrentInjector(injector);

    this.gqlQueryBuilderService = injector.get(GqlQueryBuilderService, null);
    this.httpClient = injector.get(HttpClient, null);
    this.configurationService = injector.get(ConfigurationService, null);

    setCurrentInjector(former);
  }

  getData(filter: Filter = null): Observable<any> {
    const selection = this.query().select('*').from(this.modelName);
    return this.addFilter2QuerySelection(selection, filter).build().execute();
  }

  getCount(filter: Filter = null): Observable<any> {
    const selection = this.query().select('*').from(this.modelName);
    return this.addFilter2QuerySelection(selection, filter).count().execute();
  }

  getClientSettings(): Observable<any> {
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
      .execute().pipe((m: any) => {
        if (m) {
          m.data = JSON.parse(m.data);
          return m;
        } else {
          return null;
        }
      });
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

    // return this.getClientSettings().pipe(
    //   mergeMap((clientSettings) => {
    //     if (clientSettings?.length > 0) {
    //       return this.query()
    //         .mutation('update', { model: model }, 'ClientSettings')
    //         .execute();
    //     } else {
    //       return this.query()
    //         .mutation('add', { model: model }, 'ClientSettings')
    //         .execute();
    //     }
    //   })
    // );
  }

  protected query(): GqlQueryService {
    return new GqlQueryService(
      this.gqlQueryBuilderService,
      this.httpClient,
      this.configurationService
    );
  }

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
          filter.sort[0].sortType as unknown as number
        );
      }
      if (filter.paging) {
        selection.top(filter.paging.skip ?? 0, filter.paging.take ?? 50);
      }
    }
    return selection;
  }
}
