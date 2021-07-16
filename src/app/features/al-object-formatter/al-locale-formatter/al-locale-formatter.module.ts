import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LocaleFormatterComponent } from './al-locale-formatter.component';


@NgModule({
  declarations: [LocaleFormatterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [LocaleFormatterComponent]
})
export class AlLocaleFormatterModule { }
