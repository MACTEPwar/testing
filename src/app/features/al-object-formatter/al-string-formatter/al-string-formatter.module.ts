import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { StringFormatterComponent } from './al-string-formatter.component';


@NgModule({
  declarations: [StringFormatterComponent],
  imports: [
      CommonModule,
      SharedModule
  ],
  exports: [StringFormatterComponent]
})
export class AlStringFormatterModule { }
