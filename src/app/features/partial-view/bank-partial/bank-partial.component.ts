import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-partial',
  templateUrl: './bank-partial.component.html',
  styleUrls: ['./bank-partial.component.scss'],
})
export class BankPartialComponent implements OnInit {
  headers = [
    { property: 'id', title: 'ID' },
    { property: 'code', title: 'Код' },
    { property: 'name', title: 'Название' },
    { property: 'isDeleted', title: 'Удален' },
  ];

  data = [
    {
      id: '1',
      code: '1',
      name: 'Банк 1',
      isDeleted: false,
    },
    {
      id: '2',
      code: '2',
      name: 'Банк 2',
      isDeleted: false,
    },
    {
      id: '3',
      code: '3',
      name: 'Банк 3',
      isDeleted: false,
    },
    {
      id: '4',
      code: '4',
      name: 'Банк 4',
      isDeleted: false,
    },
    {
      id: '5',
      code: '5',
      name: 'Банк 5',
      isDeleted: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
