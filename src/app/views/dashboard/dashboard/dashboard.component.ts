import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Tab } from 'src/app/types/tab';
import {TabService} from '../../../core/tab/tab.service';
import { ToggleableWindowService } from '../../../features/toggleable-window/toggleable-window.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('toggleableWindowContainer', { read: ViewContainerRef }) toggleableWindowContainer: ViewContainerRef;

  roActive = false;
  // tabs;

  constructor(private tabService: TabService, private toggleableWindowService: ToggleableWindowService) { 
    // this.tabs = tabService.tabs;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toggleableWindowService.registerViewContainer(this.toggleableWindowContainer);
}

  // addTab(url: string): void {
  //   const tab: Tab = {
  //     active: true,
  //     name: 'bank',
  //     url,
  //     canClose: false
  //   }
  //   this.tabService.add(tab);
  // }

}
