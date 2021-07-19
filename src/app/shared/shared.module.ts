import { FilterFieldPipe } from './pipes/filter-field/filter-field.pipe';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FaIconPipe, FilterFieldPipe],
  imports: [CommonModule],
  exports: [FaIconPipe, FilterFieldPipe],
})
export class SharedModule {}
