import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateTabListComponent } from './navigate-tab-list.component';
import { NavigateTabItemComponent } from './navigate-tab-item/navigate-tab-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigateTabListComponent, NavigateTabItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigateTabListComponent],
})
export class NavigateTabListModule {}
