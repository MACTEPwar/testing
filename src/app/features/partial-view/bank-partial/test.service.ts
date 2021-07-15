import { ModelLoaderService } from './../../../core/models-loader/services/model-loader.service';
import {
  Injectable,
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
@Injectable()
export class TestService {
  a: string;
  modelLoaderService2: ModelLoaderService;

  constructor(
    public injector: Injector,
    public modelLoaderService: ModelLoaderService
  ) {
    // console.log('tst', modelLoaderService);

    // const former = setCurrentInjector(injector);

    // this.modelLoaderService2 = injector.get(ModelLoaderService, null);

    // setCurrentInjector(former);

    // console.log('tst', this.modelLoaderService2);
  }
}
