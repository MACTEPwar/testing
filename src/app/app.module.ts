import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { CoreModule } from './core/core.module';
import { ModelLoaderService } from './core/models-loader/services/model-loader.service';
import { initApp } from './init-app';
import { ConfigurationService } from './core/configuration/configuration.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ViewsModule, CoreModule],
  providers: [
    ModelLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationService, ModelLoaderService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
