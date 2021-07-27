import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-text-default-filter',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  inputFilterStream$: Subject<any> = new Subject<any>();

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
