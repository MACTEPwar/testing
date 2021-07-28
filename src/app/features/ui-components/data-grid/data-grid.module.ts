import { AlObjectFormatterModule } from './../../al-object-formatter/al-object-formatter.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterModule } from '../../table-filter/table-filter.module';

@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AlObjectFormatterModule,
    SharedModule,
    SkeletonModule,
    MultiSelectModule,
    ListboxModule,
    OverlayPanelModule,
    AngularSvgIconModule,
    TableFilterModule,
  ],
  exports: [DataGridComponent],
})
export class DataGridModule {}
