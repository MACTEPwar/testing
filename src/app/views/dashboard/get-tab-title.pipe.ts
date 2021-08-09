import { MainMenuService } from './../../core/main-menu/services/concrete/main-menu.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTabTitle',
})
export class GetTabTitlePipe implements PipeTransform {
  constructor(private mainMenuService: MainMenuService) {}

  transform(name: string): string {
    return this.mainMenuService.getItem('url', name)?.name;
  }
}
