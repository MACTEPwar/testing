import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './core/interceptors/jwt.iterceptor';
import { TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { CoreModule } from './core/core.module';
import { ModelLoaderService } from './core/models-loader/services/model-loader.service';
import { initApp } from './init-app';
import { ConfigurationService } from './core/configuration/configuration.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BreadcrumbService } from './core/breadcrumb/breadcrumb.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // FormsModule,
    // ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,    
    CoreModule,
    ViewsModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    ConfigurationService,
    ModelLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationService, ModelLoaderService, TranslateService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
