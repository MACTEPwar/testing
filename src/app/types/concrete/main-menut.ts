import { IMainMenu } from '../interfaces/i-main-menu';

export class MainMenu implements IMainMenu {
    id: string;
    name: string;
    url: string;
    image: string;
    level: number;
    parentId?: number;
    color: number;
    isDeleted: boolean;
    children?: MainMenu[];
}

