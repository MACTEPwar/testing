import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { TableHttpService } from './table-http.service';

export abstract class TableService {
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
    protected tableHttpService: TableHttpService
  ) {}
  
  getData(): void {
    this.beforeGetDataHandler();
    forkJoin([
      this.tableHttpService.getData(),
      this.tableHttpService.getCount(),
    ])
      .pipe(
        tap((_) => {
          this.isLoading = true;
        })
      )
      .subscribe(([data, count]) => {
        this.data.next(data);
        this.count.next(count);
        this.afterGetDataHandler();
      });
  }

  getHeaders(): void {
    // not implemented
  }
}
