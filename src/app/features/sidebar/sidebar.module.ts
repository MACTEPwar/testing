import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule as PrimeSidebarModule } from 'primeng/sidebar';

import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { SidebarHolderDirective } from './sidebar-holder.directive';
import { SidebarService } from './sidebar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeSidebarModule
  ],
  declarations: [SidebarContainerComponent, SidebarHolderDirective],
  entryComponents: [SidebarContainerComponent],
  exports: [SidebarContainerComponent, SidebarHolderDirective],
  providers: [SidebarService]
})
export class SidebarModule { }
