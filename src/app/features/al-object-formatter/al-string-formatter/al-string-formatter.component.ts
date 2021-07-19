import { ChangeDetectionStrategy, Injector } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { TableColDirective } from '../table-col';

@Component({
  selector: 'al-string-formatter',
  templateUrl: './al-string-formatter.component.html',
  styleUrls: ['./al-string-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringFormatterComponent extends TableColDirective implements OnInit {

  @Input() value;

  constructor(injector: Injector) {
      super(injector);
  }

  ngOnInit(): void {
      this.value = this.value;
  }

}
