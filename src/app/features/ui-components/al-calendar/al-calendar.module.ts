import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AlCalendarComponent } from './al-calendar.component';
@NgModule({
  declarations: [AlCalendarComponent],
  imports: [CommonModule, ButtonModule, SharedModule],
  exports: [AlCalendarComponent],
})
export class AlCalendarModule {}
