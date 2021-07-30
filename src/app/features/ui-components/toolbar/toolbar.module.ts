import { ToolbarModule as PrimeToolbarModule } from 'primeng/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { FormsModule } from '@angular/forms';
import { AlCalendarModule } from '../al-calendar/al-calendar.module';
import { SharedModule } from '../../../shared/shared.module';
import { AlLinkedDataModule } from '../al-linked-data/al-linked-data.module';
import { ToolbarButtonComponent } from './components/toolbar-button/toolbar-button.component';
import { ToolbarCalendarComponent } from './components/toolbar-calendar/toolbar-calendar.component';
import { ToolbarOpenLinkedDataComponent } from './components/toolbar-open-linked-date/toolbar-open-linked-date.component';
import { ToolbarSeparatorComponent } from './components/toolbar-separator/toolbar-separator.component';
import { appLocalizationModuleChild } from '../../../core/localization/localization.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarCalendarComponent,
    ToolbarOpenLinkedDataComponent,
    ToolbarSeparatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlCalendarModule,
    AlLinkedDataModule,
    PrimeToolbarModule,
    FontAwesomeModule,
    appLocalizationModuleChild,
    
    SharedModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
