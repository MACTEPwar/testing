import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TableFilterService } from '../../../table-filter.service';
import { AlInputComponent } from '../../../../ui-components/al-input/al-input.component';

@Component({
  selector: 'app-text-default-filter',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  inputFilterStream$: Subject<any> = new Subject<any>();

  @Input() col: any;

  @ViewChild('input') input: any;

  constructor(private tableFilterService: TableFilterService) {
    this.inputFilterStream$
      .pipe(debounceTime(500))
      .subscribe(({ func, value }) => {
        func(value);
      });

    this.tableFilterService.clearFilter$.subscribe(() => {
      console.log(this.input)
      this.input.nativeElement.value = null;
    });

    // setTimeout((s) => {
    //   console.log(this.input.value);
    //   this.input.value = null;
    //   console.log(this.input.value);
    // }, 4000);
  }

  ngOnInit(): void {}

  onInput(value, func): void {
    this.inputFilterStream$.next({ func, value });
  }
}
