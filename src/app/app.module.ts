import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationService } from './core/configuration/configuration.service';
import { CoreModule } from './core/core.module';
import { ModelLoaderService } from './core/models-loader/services/model-loader.service';
import { initApp } from './init-app';
import { ViewsModule } from './views/views.module';
import { ModalModule } from './features/modal/modal.module';
import { SidebarModule } from './features/sidebar/sidebar.module';
import { WindowModule } from './features/window/window.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ViewsModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
    ModalModule,
    SidebarModule,
    WindowModule,
    ToastModule
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
