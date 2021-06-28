import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [LoginComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class   ViewsModule { }
