import { AToolbarOpenLinkedDataItem } from '../interfaces/a-toolbar-open-linked-date-item';

export class ToolbarOpenLinkedDataItem extends AToolbarOpenLinkedDataItem {
    readonly type: string = 'openLinkedData';

    constructor(
        public id: string,
        public lebal: string,
        public component: any,
        public value: any,
        public display: any,
        public call: Function,
        public isVisible: boolean = false,
        public classes?: string[],
        public styles?: {},
        public linkedOptions?: {}
    ) {
        super();
    }
}
