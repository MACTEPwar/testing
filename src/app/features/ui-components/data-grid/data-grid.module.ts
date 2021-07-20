import { AlObjectFormatterModule } from './../../al-object-formatter/al-object-formatter.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    AlObjectFormatterModule,
    SharedModule,
    SkeletonModule,
  ],
  exports: [DataGridComponent],
})
export class DataGridModule {}
