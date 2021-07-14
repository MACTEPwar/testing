import { IToolbarItem } from './i-toolbar-item';
export interface IToolbarActionItem extends IToolbarItem {
    disabled: boolean;
    call: Function;
}
