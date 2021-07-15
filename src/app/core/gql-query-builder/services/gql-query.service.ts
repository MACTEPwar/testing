import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/operators';
import {
  ESortType,
  ESplitterType,
  Filter,
  FilterAnd,
  FilterItem,
  FilterOr,
  IFilterSplitter,
  ISortItem,
  Paging,
  SortItem,
} from '../../../types/filter';
import { ConfigurationService } from '../../configuration/configuration.service';
import { GqlQueryBuilderService } from './gql-query-builder.service';

@Injectable()
export class GqlQueryService {
  constructor(
    protected gqlQueryBuilderService: GqlQueryBuilderService,
    protected httpClient: HttpClient,
    protected configurationService: ConfigurationService
  ) {}

  public select(
    selectedFields: string = '*',
    filterSplitter: ESplitterType = ESplitterType.AND
  ): ISelectOperation {
    return new SelectOperation(
      selectedFields,
      filterSplitter,
      this.gqlQueryBuilderService,
      this.httpClient,
      this.configurationService
    );
  }

  public getHeaders(
    modelName: string,
    server: string = 'default'
  ): Observable<any> {
    return of(
      this.gqlQueryBuilderService.buildModelSchema(modelName, 2, 0, server)
        .fields
    );
  }

  public function(
    functionsName: string,
    data: any,
    modelName: string,
    selectedFields: string = '*',
    wrappers?: any[],
    dataFromString: string[] = [],
    showError: boolean = false
  ): IExecuteOperations {
    return new ExecuteOperations(
      {
        functionsName,
        data,
        modelName,
        selectedFields,
        wrappers,
        dataFromString,
        showError,
      },
      this.httpClient,
      this.gqlQueryBuilderService,
      EExecuteType.FUNCTION,
      this.configurationService
    );
  }

  public mutation(
    functionsName: string,
    data: any,
    modelName: string,
    modelParamNames: string[] = null,
    selectedFields: string = '*',
    wrappers?: any[]
  ): IExecuteOperations {
    return new ExecuteOperations(
      {
        functionsName,
        data,
        modelName,
        modelParamNames,
        selectedFields,
        wrappers,
      },
      this.httpClient,
      this.gqlQueryBuilderService,
      EExecuteType.MUTATION,
      this.configurationService
    );
  }

  public executeGql(query: string): IExecuteOperations {
    return new ExecuteOperations(
      {
        query,
      },
      this.httpClient,
      this.gqlQueryBuilderService,
      EExecuteType.QUERY,
      this.configurationService
    );
  }
}

export interface ISelectOperation {
  filter: Filter;
  toLevel: number;
  from(modelName: string): this;
  where(
    condition: FilterItem,
    distProp?: boolean,
    filterLink?: IFilterSplitter
  ): this;
  // tslint:disable-next-line:unified-signatures
  where(
    conditions: Array<FilterItem>,
    distProp?: boolean,
    filterLink?: IFilterSplitter
  ): this;
  removeFilter(property: string): this;
  orderBy(sortFields: Array<{ sortField: string; order: number }>): this;
  orderBy(sortField: string, order: number): this;
  top(skip: number, take: number): this;
  count(): IExecuteOperations;
  build(): IExecuteOperations;
}

export class SelectOperation implements ISelectOperation {
  private modelName;
  private selectedFields;
  public filter;
  public toLevel: number;

  constructor(
    selectedFields: string,
    filterSplitter: ESplitterType,
    protected gqlQueryBuilderService: GqlQueryBuilderService,
    protected httpClient: HttpClient,
    protected configurationService: ConfigurationService
  ) {
    this.selectedFields = selectedFields;
    this.filter = new Filter(
      filterSplitter === ESplitterType.AND ? new FilterAnd() : new FilterOr()
    );
  }

  public from(modelName: string): this {
    // this.model = this.buildModelSchema(modelName, toLevel, currentLevel);
    this.modelName = modelName;
    return this;
  }

  public where(
    condition: FilterItem,
    distProp?: boolean,
    filterLink?: IFilterSplitter
  ): this;
  // tslint:disable-next-line:unified-signatures
  public where(
    conditions: Array<FilterItem>,
    distProp?: boolean,
    filterLink?: IFilterSplitter
  ): this;
  public where(
    conditions: any,
    distProp: boolean = true,
    filterLink: IFilterSplitter = this.filter.splitter
  ): this {
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }

    conditions.forEach((condition: FilterItem) => {
      const F_OBJECT = this.filter.splitter.filters.find(
        (f) => f.property === condition.property
      );
      if (F_OBJECT && distProp) {
        Object.assign(
          F_OBJECT,
          new FilterItem(
            condition.property,
            condition.value,
            condition.matchMode,
            condition.type,
            condition.parentObjectName
          )
        );
      } else {
        if (condition.splitter) {
          filterLink.filters.push(new FilterItem(condition.splitter));
        } else {
          filterLink.filters.push(
            new FilterItem(
              condition.property,
              condition.value,
              condition.matchMode,
              condition.type,
              condition.parentObjectName
            )
          );
        }
      }
    });

    return this;
  }

  public removeFilter(property?: string): this {
    if (!property) {
      this.filter.splitter.filters = [];
    } else {
      this.filter.splitter.filters = this.filter.splitter.filters.filter(
        (f) => f.property !== property
      );
    }
    return this;
  }

  public orderBy(sortFields: Array<{ sortField: string; order: number }>): this;
  public orderBy(sortField: string, order: number): this;
  public orderBy(sortFieldOrArray: any, order?: number): this {
    if (!Array.isArray(sortFieldOrArray)) {
      sortFieldOrArray = [{ sortField: sortFieldOrArray, order }];
    }

    this.filter.sort = new Array<ISortItem>(
      ...sortFieldOrArray.map(
        (m: any) =>
          new SortItem(
            m.sortField,
            m.order === -1 ? ESortType.DESC : ESortType.ASC
          )
      )
    );
    return this;
  }

  public top(skip: number, take: number): this {
    this.filter.paging = new Paging(skip, take);
    return this;
  }

  public count(): IExecuteOperations {
    return new ExecuteOperations(
      {
        modelName: this.modelName,
        filter: this.filter,
        selectedFields: this.selectedFields,
      },
      this.httpClient,
      this.gqlQueryBuilderService,
      EExecuteType.GET_COUNT,
      this.configurationService
    );
  }

  public build(): IExecuteOperations {
    return new ExecuteOperations(
      {
        modelName: this.modelName,
        filter: this.filter,
        selectedFields: this.selectedFields,
      },
      this.httpClient,
      this.gqlQueryBuilderService,
      EExecuteType.SELECT_QUERY,
      this.configurationService
    );
  }
}

export interface IExecuteOperations {
  getToLevel(level: number): this;
  execute(server?: string): Observable<any>;
  queryToString(): string;
}

export class ExecuteOperations implements IExecuteOperations {
  protected query;
  protected toLevel: number = 2;

  constructor(
    protected queryOptions: any,
    protected httpClient: HttpClient,
    protected gqlQueryBuilderService: GqlQueryBuilderService,
    protected executeType: EExecuteType = EExecuteType.SELECT_QUERY,
    protected configurationservice: ConfigurationService
  ) {}

  public getToLevel(level: number): this {
    this.toLevel = level;
    return this;
  }

  public execute(server: string = 'default'): Observable<any> {
    // TODO: использовать стратегию
    switch (this.executeType) {
      case EExecuteType.SELECT_QUERY: {
        this.query = this.executeSelectQuery(server);
        return this.executeQuery(server).pipe(
          map((m: any) => {
            // ! TODO: убрать toLowerCase когда бек доедлает
            return m.data[
              this.queryOptions.modelName[0].toLowerCase() +
                this.queryOptions.modelName.slice(1)
            ].all.items;
          })
        );
      }
      case EExecuteType.GET_COUNT: {
        this.query = this.executeGetCount();
        return this.executeQuery(server).pipe(
          map((m: any) => {
            // ! TODO: убрать toLowerCase когда бек доедлает
            return m.data[
              this.queryOptions.modelName[0].toLowerCase() +
                this.queryOptions.modelName.slice(1)
            ].all.totalCount;
          })
        );
      }

      case EExecuteType.FUNCTION: {
        const CURRENT_WRAPPERS = this.queryOptions?.wrappers
          ? [...this.queryOptions.wrappers]
          : [];
        this.query = this.executeFunction(server);
        return this.executeQuery(server).pipe(
          mergeMap((m) => {
            if (this.queryOptions.showError && m?.errors?.length > 0) {
              return throwError(
                new Error(m.errors.map((m: any) => m.message).join('. '))
              );
            } else {
              return of(m);
            }
          }),
          map((m: any) => {
            const arr = [
              'data',
              ...CURRENT_WRAPPERS,
              this.queryOptions.functionsName,
            ];
            if (this.queryOptions.functionsName === 'staticGroupProducts') {
              arr.push('items');
            }
            return arr.reduce((accObj, currObj) => accObj[currObj], m);
          })
        );
      }

      case EExecuteType.MUTATION: {
        const CURRENT_WRAPPERS = this.queryOptions?.wrappers
          ? [...this.queryOptions.wrappers]
          : [];
        this.query = this.executeMutation(server);
        return this.executeQuery(server).pipe(
          map((m: any) => {
            const arr = [
              'data',
              ...CURRENT_WRAPPERS,
              // ! TODO: убрать toLowerCase(), когда бэк доделает
              this.queryOptions.modelName[0].toLowerCase() +
                this.queryOptions.modelName.slice(1),
              this.queryOptions.functionsName,
            ];
            return arr.reduce((accObj, currObj) => accObj[currObj], m);
          })
        );
      }
      case EExecuteType.QUERY: {
        this.query = this.queryOptions.query;
        return this.executeQuery(server);
      }
    }
  }

  public queryToString(): string {
    switch (this.executeType) {
      case EExecuteType.SELECT_QUERY: {
        return this.executeSelectQuery();
      }
      case EExecuteType.GET_COUNT: {
        return this.executeGetCount();
      }

      case EExecuteType.FUNCTION: {
        return this.executeFunction();
      }
      case EExecuteType.MUTATION: {
        this.executeMutation();
      }
    }
  }

  private executeSelectQuery(server: string = 'default'): string {
    return this.gqlQueryBuilderService.queryGetItems(
      this.queryOptions.modelName,
      server,
      this.queryOptions.filter,
      this.queryOptions.selectedFields,
      this.queryOptions.toLevel ?? 2
    );
  }

  private executeGetCount(): string {
    return this.gqlQueryBuilderService.queryGetCount(
      this.queryOptions.modelName,
      this.queryOptions.filter
    );
  }

  private executeFunction(server: string = 'default'): string {
    return this.gqlQueryBuilderService.parseFunctionToGqlSignature(
      this.queryOptions.functionsName,
      server,
      this.queryOptions.data,
      this.queryOptions.modelName,
      this.queryOptions.selectedFields,
      this.queryOptions.wrappers,
      this.queryOptions.dataFromString,
      this.toLevel
    );
  }

  private executeMutation(server: string = 'default'): string {
    return this.gqlQueryBuilderService.parseMutationToGqlSignature(
      this.queryOptions.functionsName,
      server,
      this.queryOptions.data,
      this.queryOptions.modelName,
      this.queryOptions.modelParamNames,
      this.queryOptions.selectedFields,
      this.queryOptions.wrappers
    );
  }

  private executeQuery(server: string = 'default'): Observable<any> {
    let iphost = `${this.configurationservice.getValue('apiUrl')}/graphql`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    if (server === 'needed') {
      iphost = `${this.configurationservice.getValue(
        'apiNeededUrl'
      )}/needed/graphql`;
    }

    return this.httpClient.post(
      iphost,
      JSON.stringify({
        query: this.query,
      }),
      httpOptions
    );
  }
}

export enum EExecuteType {
  SELECT_QUERY,
  GET_COUNT,
  FUNCTION,
  MUTATION,
  QUERY,
}
