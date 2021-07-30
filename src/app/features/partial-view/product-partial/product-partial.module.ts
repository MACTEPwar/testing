import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPartialComponent } from './product-partial.component';
import { appLocalizationModuleChild } from '../../../core/localization/localization.module';
import { TableModule } from '../../table-base/table.module';

@NgModule({
  declarations: [ProductPartialComponent],
  imports: [CommonModule, appLocalizationModuleChild, TableModule],
  exports: [ProductPartialComponent],
})
export class ProductPartialModule {}
