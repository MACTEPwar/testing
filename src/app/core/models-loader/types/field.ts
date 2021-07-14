export class Field {

    fields?: Array<Field>;

    constructor(
        public property?: string,
        public typeName?: string,
        public kind?: string,
        public isRequired?: boolean,
        public isHidden?: boolean,
        public title?: string,
        public isFilterKey?: boolean,
        public isReadOnly?: boolean,
        public ofModel?: string
    ) { }
}
