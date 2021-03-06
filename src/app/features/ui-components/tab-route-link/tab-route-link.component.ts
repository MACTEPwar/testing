import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabService } from 'src/app/core/tab/tab.service';
import { Tab } from '../../../types/tab'

@Component({
  selector: 'app-tab-route-link',
  templateUrl: './tab-route-link.component.html',
  styleUrls: ['./tab-route-link.component.scss']
})
export class TabRouteLinkComponent implements OnInit {

  // @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  // @Output() disactivate: EventEmitter<any> = new EventEmitter<any>();

  @Input() tab: Tab;

  constructor(private tabService: TabService) { }

  ngOnInit(): void {
  }

  openTab(): void {
    // this.tabService.add(this.tab);
  }

}
