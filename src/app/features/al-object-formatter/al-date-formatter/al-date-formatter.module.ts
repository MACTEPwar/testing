import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DateFormatterComponent } from './al-date-formatter.component';


@NgModule({
  declarations: [DateFormatterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [DateFormatterComponent]
})
export class AlDateFormatterModule { }
