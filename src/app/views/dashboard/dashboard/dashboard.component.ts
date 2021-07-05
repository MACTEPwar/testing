import { Component, OnInit } from '@angular/core';
import {TabService} from '../../../core/tab/tab.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roActive = false;
  tabs;

  constructor(tabService: TabService) { 
    this.tabs = tabService.tabs;
  }

  ngOnInit(): void {
  }

}
