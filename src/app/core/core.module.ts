import { ModelsLoaderModule } from './models-loader/models-loader.module';
import { GqlQueryBuilderModule } from './gql-query-builder/gql-query-builder.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabModule } from './tab/tab.module';

@NgModule({
  imports: [
    BrowserModule,
    TabModule,
    GqlQueryBuilderModule,
    ModelsLoaderModule,
  ],
})
export class CoreModule {}
