import { Observable } from 'rxjs';
import { IMainMenu } from '../../../types/interfaces/i-main-menu';

export interface IMainMenuService {
    refreshMenu(): void;
    getItem(key: string, value: any): IMainMenu;
}
