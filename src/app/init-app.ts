import { TranslateService } from '@ngx-translate/core';
import { mergeMap, tap } from 'rxjs/operators';
import { ConfigurationService } from './core/configuration/configuration.service';
import { ModelLoaderService } from './core/models-loader/services/model-loader.service';

export function initApp(
  configurationService: ConfigurationService,
  modelLoaderService: ModelLoaderService,
  translateService: TranslateService
) {
  return () =>
    configurationService
      .load()
      .pipe(
        mergeMap((m) => {
          translateService.addLangs(
            configurationService.getValue('languages')
          );
          translateService.use(
            configurationService.getValue('defaultLanguage')
          );
          return modelLoaderService.loadModels();
        })
      )
      .toPromise()
}
