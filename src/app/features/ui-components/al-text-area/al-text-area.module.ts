import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormErrorPipeModule } from '../../pipes/form-error-pipe/form-error-pipe.module';
import { AlTextAreaComponent } from './al-text-area.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [AlTextAreaComponent],
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      InputTextModule,
      FormErrorPipeModule,
      SharedModule
  ],
    exports: [AlTextAreaComponent]
})
export class AlTextAreaModule { }
