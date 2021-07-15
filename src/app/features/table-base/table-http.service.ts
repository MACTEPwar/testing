import { ConfigurationService } from './../../core/configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { GqlQueryBuilderService } from './../../core/gql-query-builder/services/gql-query-builder.service';
import {
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { GqlQueryService } from './../../core/gql-query-builder/services/gql-query.service';
import { Filter } from './../../types/filter';
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
    return this.query().select('*').from(this.modelName).build().execute();
  }

  getCount(): Observable<any> {
    return of([]);
  }

  protected query(): GqlQueryService {
    return new GqlQueryService(
      this.gqlQueryBuilderService,
      this.httpClient,
      this.configurationService
    );
  }
}
