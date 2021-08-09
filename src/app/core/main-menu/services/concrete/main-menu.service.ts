import { ConfigurationService } from '../../../configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMainMenu } from '../../../../types/interfaces/i-main-menu';
import { IMainMenuService } from '../i-main-menu.service';

@Injectable()
// export class MainMenuService implements IMainMenuService {
export class MainMenuService implements IMainMenuService {
  public menu: BehaviorSubject<IMainMenu[]> = new BehaviorSubject<IMainMenu[]>(
    []
  );

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.getMenu();
  }

  public refreshMenu(): void {
    this.getMenu();
  }

  private getMenu(): void {
    this.getMenuApi().subscribe((e) => {
      this.menu.next(e);
    });
  }

  public getItem(key: string, value: any): any {
    return this.findItem(this.menu.value, key, value);
  }

  private findItem(level: IMainMenu[], key: string, value: any): IMainMenu {
    let found = null;

    level.find((el) => {
      if (el[key] === value) {
        found = el;
        return true;
      } else if (
        el.children.length > 0 &&
        this.findItem(el.children, key, value)
      ) {
        found = this.findItem(el.children, key, value);
        return true;
      }
      return false;
    });

    return found;
  }

  private getMenuApi(): Observable<IMainMenu[]> {
    return this.http.get<IMainMenu[]>(
      `${this.configurationService.getValue('apiUrl')}/api/settings/menu/all`
    );
  }
}
