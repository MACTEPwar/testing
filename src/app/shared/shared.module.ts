import { EnumeratorPipe } from './pipes/enumerator/enumerator.pipe';
import { StringFormatterPipe } from './pipes/string-formatter/string-formatter.pipe';
import { FilterFieldPipe } from './pipes/filter-field/filter-field.pipe';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FaIconPipe, FilterFieldPipe, StringFormatterPipe, EnumeratorPipe],
  imports: [CommonModule],
  exports: [FaIconPipe, FilterFieldPipe, StringFormatterPipe, EnumeratorPipe],
})
export class SharedModule {}
