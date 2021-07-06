import { Component, Input, OnInit } from '@angular/core';
import { TabService } from '../../../../core/tab/tab.service';
import { Tab } from '../../../../types/tab';

@Component({
  selector: 'app-navigate-tab-item',
  templateUrl: './navigate-tab-item.component.html',
  styleUrls: ['./navigate-tab-item.component.scss']
})
export class NavigateTabItemComponent implements OnInit {

  @Input() tab: Tab;

  constructor(private tabService: TabService) { }

  ngOnInit(): void {
  }

  closeTab(): void {
    this.tabService.close(this.tab);
    console.log('test', this.tab)
  }

}
