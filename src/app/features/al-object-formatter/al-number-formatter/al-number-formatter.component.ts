import { Component, Injector, Input, OnInit } from '@angular/core';
import { TableColDirective } from '../table-col';

@Component({
  selector: 'al-number-formatter',
  templateUrl: './al-number-formatter.component.html',
  styleUrls: ['./al-number-formatter.component.scss']
})
export class NumberFormatterComponent extends TableColDirective implements OnInit {

  @Input() value;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.value = this.value ?? ' --- ';
  }

}
