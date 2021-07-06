import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {TabService} from '../../../core/tab/tab.service';
import { Tab } from '../../../types/tab';

@Component({
  selector: 'app-navigate-tab-list',
  templateUrl: './navigate-tab-list.component.html',
  styleUrls: ['./navigate-tab-list.component.scss']
})
export class NavigateTabListComponent implements OnInit {

  tabs: Observable<Array<Tab>>

  constructor(private tabService: TabService) { 
    this.tabs = this.tabService.tabs;
  }

  ngOnInit(): void {
  }

}
