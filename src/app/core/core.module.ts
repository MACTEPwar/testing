import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabModule } from './tab/tab.module';

@NgModule({
    imports: [BrowserModule,TabModule]
})
export class CoreModule{}