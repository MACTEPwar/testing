import { Filter } from './../../types/filter';
import { Model } from './../../core/models-loader/types/model';
import { ModelLoaderService } from './../../core/models-loader/services/model-loader.service';
import {
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { TableHttpService } from './table-http.service';
import { FilterItem } from 'src/app/types/filter';

export abstract class TableService {
  modelLoaderService: ModelLoaderService;

  data: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    new Array()
  );

  headers: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    new Array()
  );

  count: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  isLoading = false;

  protected beforeGetDataHandler: Function = () => {};
  protected afterGetDataHandler: Function = () => {};

  constructor(
    protected modelName,
    protected tableHttpService: TableHttpService,
    protected injector: Injector
  ) {
    this.setServicesFromDI(injector);

    // console.log('tst', injector);
    // console.log('tst2', this.modelLoaderService);
  }

  getData(filter: Filter = null): void {
    this.beforeGetDataHandler();
    forkJoin([
      this.tableHttpService.getData(filter),
      this.tableHttpService.getCount(filter),
    ])
      .pipe(
        tap((_) => {
          this.isLoading = true;
        })
      )
      .subscribe(([data, count]) => {
        console.log('c', count)
        this.data.next(data);
        this.count.next(count);
        this.afterGetDataHandler();
      });
  }

  getHeaders(): void {
    this.headers.next(this.modelLoaderService.getModel(this.modelName, 'default').fields);
  }

  private setServicesFromDI(injector: Injector): void {
    const former = setCurrentInjector(injector);

    this.modelLoaderService = injector.get(ModelLoaderService, null);

    setCurrentInjector(former);
  }
}
