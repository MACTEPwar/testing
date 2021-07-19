import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { TableColDirective } from '../table-col';

@Component({
  selector: 'al-boolean-formatter',
  templateUrl: './al-boolean-formatter.component.html',
  styleUrls: ['./al-boolean-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanFormatterComponent extends TableColDirective implements OnInit {

  @Input() value;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.value = super.getValue() ?? this.value ?? false;
  }

}
