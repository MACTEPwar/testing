import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TabService } from './../../../core/tab/tab.service';
import { ModalService } from './../../../features/modal/modal.service';
import { SidebarService } from './../../../features/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard-test',
  templateUrl: './dashboard-test.component.html',
  styleUrls: ['./dashboard-test.component.scss'],
})
export class DashboardTestComponent implements OnInit, AfterViewInit {
  tabs;

  @ViewChild('toggleableWindowContainer', { read: ViewContainerRef })
  toggleableWindowContainer: ViewContainerRef;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private tabService: TabService,
    private sidebarService: SidebarService,
    private modalService: ModalService
  ) {
    this.tabs = this.tabService.tabs;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sidebarService.registerViewContainer(this.toggleableWindowContainer);
    this.modalService.registerViewContainer(this.toggleableWindowContainer);
  }

  open(name: string): void {
    this.tabService.open({
      id: name,
    });
  }

  activateTab(index: number): void {
    this.tabService.activateTab(index);
  }

  closeTab(index: number): void {
    this.tabService.drop(index);
  }
}
