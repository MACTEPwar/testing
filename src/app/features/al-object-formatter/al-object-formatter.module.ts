import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlBooleanFormatterModule } from './al-boolean-formatter/al-boolean-formatter.module';
import { AlDateFormatterModule } from './al-date-formatter/al-date-formatter.module';
import { AlLocaleFormatterModule } from './al-locale-formatter/al-locale-formatter.module';
import { AlNumberFormatterModule } from './al-number-formatter/al-number-formatter.module';
import { AlStringFormatterModule } from './al-string-formatter/al-string-formatter.module';
import { SharedModule } from '../../shared/shared.module';
import { ObjectFormatterComponent } from './al-object-formatter.component';
import { GetConstantPipe } from './get-constant.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ObjectFormatterComponent, GetConstantPipe],
  imports: [
    CommonModule,
    SharedModule,
    AlLocaleFormatterModule,
    AlBooleanFormatterModule,
    AlStringFormatterModule,
    AlNumberFormatterModule,
    AlDateFormatterModule,
  ],
  exports: [
    ObjectFormatterComponent,
    AlLocaleFormatterModule,
    AlBooleanFormatterModule,
    AlStringFormatterModule,
    AlNumberFormatterModule,
    AlDateFormatterModule,
    FormsModule,
  ],
})
export class AlObjectFormatterModule {}
