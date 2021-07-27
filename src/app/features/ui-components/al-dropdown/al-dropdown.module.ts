import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormErrorPipeModule } from '../../../features/pipes/form-error-pipe/form-error-pipe.module';
import { AlDropdownComponent } from './al-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AlDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorPipeModule,
    TranslateModule,
    SharedModule,
  ],
  exports: [AlDropdownComponent],
})
export class AlDropdownModule {}
