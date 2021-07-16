import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NumberFormatterComponent } from './al-number-formatter.component';


@NgModule({
  declarations: [NumberFormatterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [NumberFormatterComponent]
})
export class AlNumberFormatterModule { }
