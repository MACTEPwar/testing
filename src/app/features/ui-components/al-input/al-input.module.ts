import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AlInputComponent } from './al-input.component';
import { FormErrorPipeModule } from '../../pipes/form-error-pipe/form-error-pipe.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AlInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FormErrorPipeModule,
    SharedModule,
  ],
  exports: [AlInputComponent],
})
export class AlInputModule {}
