export interface IMainMenu {
    id: string;
    name: string;
    url: string;
    image: string;
    level: number;
    color: number;
    isDeleted: boolean;
    parentId?: number;
    children?: IMainMenu[];
}
