import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BooleanFormatterComponent } from './al-boolean-formatter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [BooleanFormatterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [BooleanFormatterComponent]
})
export class AlBooleanFormatterModule { }
