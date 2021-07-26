import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: []
})
export class BankComponent implements OnInit {
  public items: any[];
  public home: any;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.items = this.breadcrumbService.getBreadcrumb();
    this.home = this.breadcrumbService.getHome();
  }
}
