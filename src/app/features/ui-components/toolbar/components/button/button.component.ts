import { Component, OnInit } from '@angular/core';
import { ButtonOptions } from '../../options/button-options';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  public options: ButtonOptions;

  constructor() {}

  ngOnInit(): void {
  }
}
