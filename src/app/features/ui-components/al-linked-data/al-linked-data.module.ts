import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AlLinkedDataComponent } from './al-linked-data.component';
import {FormErrorPipeModule} from '../../pipes/form-error-pipe/form-error-pipe.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    declarations: [AlLinkedDataComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        FormErrorPipeModule,
        FontAwesomeModule,
        SharedModule
    ],
    exports: [AlLinkedDataComponent],
})
export class AlLinkedDataModule {}
