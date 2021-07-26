import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable()
export class BreadcrumbService {
  currentUrl: string;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  /**
   * Получает объект для роута home 
   */
  getHome(): MenuItem {
    return { icon: 'pi pi-home', routerLink: '/' };
  }

  /**
   * Возвращает массив объектов для отображения breadcrumbs по роуту
   */
  getBreadcrumb(): MenuItem[] {
      let ttt = '/';
    return this.currentUrl
      .split('/')
      .filter(f => f.trim() !== '')
      .filter((f) => f !== 'dashboard')
      .map((m) => {
        let obj: MenuItem = {
          label: m,
          routerLink: ttt + m + '/'
        };
        ttt += m + '/';
        return obj;
      });
  }
}
