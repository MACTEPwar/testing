import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlCheckboxComponent } from './al-checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AlCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    SharedModule,
  ],
  exports: [AlCheckboxComponent],
})
export class AlCheckboxModule {}
