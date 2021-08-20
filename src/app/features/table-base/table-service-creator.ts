import { Injector, StaticProvider } from '@angular/core';
import { TableHttpService } from './a-table-http.service';
import { TableService } from './table.service';

export class TableServiceCreator<
  T extends TableHttpService,
  S extends TableService
> {
  constructor(
    private typeHttpService: new (modelName: string, injector: Injector) => T,
    private typeService: new (httpService: any, injector: Injector) => S,
    private modelName: string,
    private injector: typeof Injector
  ) {}

  getNewTableHttpServiceInjector(): StaticProvider[] {
    return [
      {
        provide: this.typeHttpService,
        deps: [this.injector],
        useFactory: (i: Injector): T =>
          new this.typeHttpService(this.modelName, i),
      },
      {
        provide: this.typeService,
        deps: [this.typeHttpService, this.injector],
        useFactory: (httpService: typeof TableHttpService, i: Injector): S => {
          return new this.typeService(httpService, i);
        },
      },
    ];
  }
}
