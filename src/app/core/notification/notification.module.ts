import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationService,
    MessageService
  ]
})
export class NotificationModule { }
