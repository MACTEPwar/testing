import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabRouteLinkComponent } from './tab-route-link.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TabRouteLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [TabRouteLinkComponent]
})
export class TabRouteLinkModule { }
