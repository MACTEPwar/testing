import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BooleanFormatterComponent } from './al-boolean-formatter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [BooleanFormatterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    AngularSvgIconModule
  ],
  exports: [BooleanFormatterComponent]
})
export class AlBooleanFormatterModule { }
