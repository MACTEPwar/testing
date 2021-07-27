import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorPipePipe } from './form-error-pipe.pipe';



@NgModule({
  declarations: [FormErrorPipePipe],
  imports: [
    CommonModule
  ],
  exports: [FormErrorPipePipe]
})
export class FormErrorPipeModule { }
