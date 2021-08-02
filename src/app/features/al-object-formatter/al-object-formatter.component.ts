import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { AlTemplateDirective } from '../../shared/directives/al-tempalte/al-template.directive';
import { AfterContentInit } from '@angular/core';
import { SpecialField } from '../../types/special-field';

@Component({
  selector: 'al-object-formatter',
  templateUrl: './al-object-formatter.component.html',
  styleUrls: ['./al-object-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectFormatterComponent implements OnInit, AfterContentInit {
  @Input() col;
  @Input() value;
  @Input() flag = false;
  @Input() constants: any;
  @Input() tempalte: TemplateRef<any>

  specialFields: SpecialField[] = [];

  @ContentChildren(AlTemplateDirective)
  templates: QueryList<AlTemplateDirective>;

  constructor() {}

  ngOnInit(): void {
    this.value = this.value ?? '---';
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      this.specialFields.push({
        property: item.getType(),
        template: item.template,
      });
    });
  }
}
