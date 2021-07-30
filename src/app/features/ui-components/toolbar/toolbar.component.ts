import { Component, Input, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { BehaviorSubject } from 'rxjs';
import { IToolbarItem } from './models/interfaces/i-toolbar-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [ToolbarService]
})
export class ToolbarComponent implements OnInit {

  @Input() items: IToolbarItem[];

  toolbarItems: BehaviorSubject<IToolbarItem[]>

  constructor(private toolbarService: ToolbarService) { 
    this.toolbarItems = this.toolbarService.items;
  }

  ngOnInit(): void {
    this.toolbarService.setItems(this.items);
  }

}
