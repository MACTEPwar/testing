import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public items: any[];
  public home: any;
  private _title: string;
  public set title(value: string){
    this._title = value;
  }
  public get title(): string {
    return this._title[0].toUpperCase() + this._title.slice(1).toLowerCase();
  }

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.items = this.breadcrumbService.getBreadcrumb();
    this.home = this.breadcrumbService.getHome();
    this.title = this.items[this.items.length - 1].label
  }

}
