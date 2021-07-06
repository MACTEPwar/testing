import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/types/tab';
import {TabService} from '../../../core/tab/tab.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roActive = false;
  tabs;

  constructor(private tabService: TabService) { 
    this.tabs = tabService.tabs;
  }

  ngOnInit(): void {
  }

  addTab(url: string): void {
    const tab: Tab = {
      active: true,
      name: 'bank',
      url,
      canClose: false
    }
    this.tabService.add(tab);
  }

}
