import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../../shared/shared.module';
import { GetDisplayFieldByTypeModule } from '../pipes/get-display-field-by-type/get-display-field-by-type.module';
import { GetKeyModule } from '../pipes/get-key/get-key.module';
import { TitleByControlNameModule } from '../pipes/title-by-control-name/title-by-control-name.module';
import { DataGridModule } from '../ui-components/data-grid/data-grid.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataGridModule,
    FormsModule,
    DialogModule,
    TitleByControlNameModule,
    GetDisplayFieldByTypeModule,
    GetKeyModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    DataGridModule,
    FormsModule,
    DialogModule,
    TitleByControlNameModule,
    GetDisplayFieldByTypeModule,
    GetKeyModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class TableModule {}
