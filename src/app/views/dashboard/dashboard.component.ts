import { MainMenuService } from './../../core/main-menu/services/concrete/main-menu.service';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
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

  title = 'testTitle';
  public breadcrumbItems: any[];
  public breadcrumbHome: any;

  mainMenu;
  subMenuItems = [];

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private tabService: TabService,
    private sidebarService: SidebarService,
    private modalService: ModalService,
    protected breadcrumbService: BreadcrumbService,
    private mainMenuService: MainMenuService
  ) {
    this.tabs = this.tabService.tabs;
    this.mainMenu = this.mainMenuService.menu;
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

  openSubMenu(id: string): void {
    const item = this.mainMenuService.getItem('id', id);
    console.log('item', item)
    if (item.url) {
      this.open(item.url);
      this.showedCatalogs = false;
      console.log(item.url);
    } else {
      this.subMenuItems = item.children;
      this.showedCatalogs = true;
    }
  }
}
