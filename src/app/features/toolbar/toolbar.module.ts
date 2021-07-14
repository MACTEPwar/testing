import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarButtonComponent } from './components/toolbar-button/toolbar-button.component';
import { ToolbarSeparatorComponent } from './components/toolbar-separator/toolbar-separator.component';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarOpenLinkedDataComponent } from './components/toolbar-open-linked-date/toolbar-open-linked-date.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        ToolbarComponent,
        ToolbarButtonComponent,
        ToolbarSeparatorComponent,
        ToolbarOpenLinkedDataComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
