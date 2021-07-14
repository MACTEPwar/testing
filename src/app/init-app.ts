import { mergeMap } from 'rxjs/operators';
import { ConfigurationService } from './core/configuration/configuration.service';
import { ModelLoaderService } from './core/models-loader/services/model-loader.service';

export function initApp(
  configurationService: ConfigurationService,
  modelLoaderService: ModelLoaderService
) {
  return () =>
    configurationService
      .load()
      .pipe(mergeMap((m) => modelLoaderService.loadModels()))
      .toPromise();
}
