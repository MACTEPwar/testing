import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BreadcrumbService } from '../../core/breadcrumb/breadcrumb.service';
import { TabService } from '../../core/tab/tab.service';
import { ModalService } from '../../features/modal/modal.service';
import { SidebarService } from '../../features/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  tabs;

  @ViewChild('toggleableWindowContainer', { read: ViewContainerRef })
  toggleableWindowContainer: ViewContainerRef;

  showedCatalogs = false;

  title = 'testTitle'
  public breadcrumbItems: any[];
  public breadcrumbHome: any;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private tabService: TabService,
    private sidebarService: SidebarService,
    private modalService: ModalService,
    protected breadcrumbService: BreadcrumbService
  ) {
    this.tabs = this.tabService.tabs;
  }

  ngOnInit(): void {
    this.breadcrumbItems = this.breadcrumbService.getBreadcrumb();
    this.breadcrumbHome = this.breadcrumbService.getHome();
  }

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
