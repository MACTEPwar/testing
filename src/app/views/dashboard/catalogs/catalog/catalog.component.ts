import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  roActive = false;
  public breadcrumbItems: any[];
  public breadcrumbHome: any;
  private _title: string;
  public set title(value: string) {
    this._title = value;
  }
  public get title(): string {
    return this._title[0].toUpperCase() + this._title.slice(1).toLowerCase();
  }

  constructor(protected breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbItems = this.breadcrumbService.getBreadcrumb();
    this.breadcrumbHome = this.breadcrumbService.getHome();
    this.title = this.breadcrumbItems[this.breadcrumbItems.length - 1].label;
  }

}
