import { ConfigurationModule } from './configuration/configuration.module';
import { mergeMap } from 'rxjs/operators';
import { ConfigurationService } from './configuration/configuration.service';
import { ModelLoaderService } from './models-loader/services/model-loader.service';
import { TranslateService } from '@ngx-translate/core';
import {
  LocalizationModule,
  appLocalizationModuleChild,
} from './localization/localization.module';
import { JwtInterceptor } from './interceptors/jwt.iterceptor';
import { ModelsLoaderModule } from './models-loader/models-loader.module';
import { GqlQueryBuilderModule } from './gql-query-builder/gql-query-builder.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional } from '@angular/core';
import { TabModule } from './tab/tab.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    TabModule,
    GqlQueryBuilderModule,
    ModelsLoaderModule,
    LocalizationModule,
    ConfigurationModule,
  ],
  providers: [
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useFactory: (ts: TranslateService) => {
        return new JwtInterceptor(ts);
      },
      deps: [TranslateService],
    },
  ],
})
export class CoreModule {}
