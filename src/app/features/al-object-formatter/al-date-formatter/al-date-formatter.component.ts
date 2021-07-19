import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'al-date-formatter',
  templateUrl: './al-date-formatter.component.html',
  styleUrls: ['./al-date-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFormatterComponent implements OnInit {

  @Input() value;

  constructor() { }

  ngOnInit(): void {
    if (this.value?.toString().search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{6})?/g) !== -1) {
      this.value = new Date(this.value);
    } else {
      this.value = null
    }
  }

}
