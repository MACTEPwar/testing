import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableFilterService } from '../../../table-filter.service';

@Component({
  selector: 'app-bool-default-filter',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Input() property;
  @Input() appendTo;

  @ViewChild('filter') filter;

  constructor(private tableFilterService: TableFilterService) {
    this.tableFilterService.clearFilter$.subscribe(() => {
      
    });
  }

  ngOnInit(): void {}

  onChange(event, filterCallback): void{
    if (event === null) {
      this.filter.clearFilter();
    } else {
      filterCallback(event);
    }
  }
}
