import { AToolbarSeparatorItem } from '../interfaces/a-toolbar-separator-item';

export class ToolbarSeparatorItem extends AToolbarSeparatorItem {
    readonly type: string = 'separator';

    constructor(
        id: string,
        isVisible = false,
        classes?: string[],
        styles?: {}
    ) {
        super();
        this.id = id;
        this.classes = classes;
        this.styles = styles;
        this.isVisible = isVisible;
    }
}
