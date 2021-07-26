import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { GqlQueryBuilderModule } from './gql-query-builder/gql-query-builder.module';
import { JwtInterceptor } from './interceptors/jwt.iterceptor';
import {
  LocalizationModule
} from './localization/localization.module';
import { ModelsLoaderModule } from './models-loader/models-loader.module';
import { TabModule } from './tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    GqlQueryBuilderModule,
    ModelsLoaderModule,
    LocalizationModule,
    ConfigurationModule,
    BreadcrumbModule,
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
  exports: [BreadcrumbModule],
})
export class CoreModule {}
