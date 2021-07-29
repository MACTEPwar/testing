import { Component, Input, HostBinding, ViewChild, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { SidebarContext } from './sidebar-context';
import { SidebarContainer } from './sidebar-container';

@Component({
  selector: 'sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.css'],
})
export class SidebarContainerComponent implements SidebarContainer, AfterContentInit {
  // @HostBinding('@host') host;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  context: SidebarContext<any>;

  isShow = false;

  ngAfterContentInit(): void {
    setTimeout(() => {this.isShow = true;},100);
  }
}
