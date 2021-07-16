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
          selection.where(new FilterItem(f.property, f.value, f.matchMode, f.type, f.parentObjectName))
        })
      }
      if (filter.sort && filter.sort[0]){
        selection.orderBy(filter.sort[0]?.field, (filter.sort[0].sortType as unknown) as number)
      }
      if (filter.paging) {
        console.log('fp', filter.paging)
        selection.top(filter.paging.skip ?? 0, filter.paging.take ?? 50);
      }
    }
    return selection;
  }
}
