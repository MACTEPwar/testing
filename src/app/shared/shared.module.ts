import { EnumeratorPipe } from './pipes/enumerator/enumerator.pipe';
import { StringFormatterPipe } from './pipes/string-formatter/string-formatter.pipe';
import { FilterFieldPipe } from './pipes/filter-field/filter-field.pipe';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlTemplateDirective } from './directives/al-tempalte/al-template.directive';
import { FormDisabledDirective } from './directives/al-form-disabled/form-disabled.directive';

@NgModule({
  declarations: [
    FaIconPipe,
    FilterFieldPipe,
    StringFormatterPipe,
    EnumeratorPipe,
    AlTemplateDirective,
    FormDisabledDirective,
  ],
  imports: [CommonModule],
  exports: [
    FaIconPipe,
    FilterFieldPipe,
    StringFormatterPipe,
    EnumeratorPipe,
    AlTemplateDirective,
    FormDisabledDirective,
  ],
})
export class SharedModule {}
