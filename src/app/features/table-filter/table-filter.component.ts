import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  inputFilterStream$: Subject<any> = new Subject<any>();

  @Input() flag = false;
  @Input() col: any;

  constructor() {
    this.inputFilterStream$
      .pipe(debounceTime(1000))
      .subscribe(({ func, value }) => {
        func(value);
      });
  }

  ngOnInit(): void {}

  onInput(value, func): void {
    this.inputFilterStream$.next({ func, value });
  }
}
