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

  title = '';
  public breadcrumbItems: any[] = [];
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
    this.breadcrumbHome = this.breadcrumbService.getHome();

    this.tabService.currentTab.subscribe((cuurentTab) => {
      if (cuurentTab) {
        this.breadcrumbItems = [];
        this.loadBreadCrumbs(cuurentTab, 'url', 'id');
        this.title = cuurentTab.name;
      }
    });
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
    if (item.url) {
      this.open(item.url);
      this.showedCatalogs = false;
    } else {
      this.subMenuItems = item.children;
      this.showedCatalogs = true;
    }
  }

  /**
   * Собирает крошки
   * @param element Текущий элемент
   * @param keyInCurrent Ключ в элементе для поиска
   * @param keyInFinded Ключ в найденном элементе
   */
  loadBreadCrumbs(
    element,
    keyInCurrent = 'id',
    keyInFinded = 'parentId'
  ): void {
    let currentElement = this.mainMenuService.getItem(
      keyInCurrent,
      element[keyInFinded]
    );
    this.breadcrumbItems.unshift({
      label: currentElement?.name,
    });
    if (currentElement?.parentId !== null && currentElement?.parentId !== undefined) {
      this.loadBreadCrumbs(currentElement);
    }
  }
}
