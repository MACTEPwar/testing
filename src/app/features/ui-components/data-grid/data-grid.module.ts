import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DataGridComponent],
  imports: [CommonModule, TableModule],
  exports: [DataGridComponent],
})
export class DataGridModule {}
