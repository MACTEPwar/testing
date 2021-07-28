import { AToolbarButtonItem } from '../interfaces/a-toolbar-button-item';

export class ToolbarButtonItem extends AToolbarButtonItem {
    readonly type: string = 'button';

    constructor(
        id: string,
        title?: string,
        icon?: string,
        call: Function = () => {},
        disabled: boolean = false,
        typeIcon: 'path' | 'prime' | 'fontawesome' = 'fontawesome',
        isVisible = false,
        classes?: string[],
        styles?: {}
    ) {
        super();
        if (!title && !icon) {
            console.error('нет title и icon');
        }
        this.title = title;
        this.icon = icon;
        this.typeIcon = typeIcon;
        this.disabled = disabled;
        this.call = () => {
            if (this.disabled) {
                return;
            } else {
                call.apply(null);
            }
        };
        this.classes = classes;
        this.styles = styles;
        this.isVisible = isVisible;
        this.id = id;
    }
}
