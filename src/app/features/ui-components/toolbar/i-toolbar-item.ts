import { Type } from '@angular/core';

export interface IToolbarItem {
  component: Type<any>;
  options: any;
  // callbacks: {event: string, handler: Function}[]
}
