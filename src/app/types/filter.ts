

export class FilterItem implements IFilterItem {
    public property?: string;
    public value?: string;
    public matchMode?: string;
    public splitter?: IFilterSplitter;
    public type: EFilterType = EFilterType.STRING;
    public parentObjectName?: string

    constructor(
        property: string,
        value: string,
        matchMode: string,
        type?: EFilterType,
        parentObjectName?: string
    );
    constructor(
        splitter: IFilterSplitter
    );
    constructor(
        propertyOrSplitter?: string | IFilterSplitter,
        value?: string,
        matchMode?: string,
        type?: EFilterType,
        parentObjectName?: string
    ) {
        if (!value && !matchMode) {
            this.splitter = propertyOrSplitter as IFilterSplitter;
        } else {
            this.property = propertyOrSplitter as string;
            this.matchMode = matchMode;
            this.value = value;
            this.type = type;
            this.parentObjectName = parentObjectName;
        }
    }
}

export class FilterAnd implements IFilterSplitter {
    constructor(
        public filters: Array<IFilterItem> = new Array<IFilterItem>(),
        public type: ESplitterType = ESplitterType.AND
    ) { }
}

export class FilterOr implements IFilterSplitter {
    constructor(
        public filters: Array<IFilterItem> = new Array<IFilterItem>(),
        public type: ESplitterType = ESplitterType.OR
    ) { }
}

export interface IFilterSplitter {
    filters: Array<IFilterItem>;
    type: ESplitterType;
}

export interface IFilterItem {
    property?: string;
    value?: any;
    matchMode?: string;
    splitter?: IFilterSplitter;
    type?: EFilterType;
    parentObjectName?: string
}

export class Filter {
    constructor(
        public splitter: IFilterSplitter,
        public paging?: IPaging,
        public sort: Array<ISortItem> = new Array<ISortItem>()
    ) { }
}

export class Paging implements IPaging {
    constructor(
        public skip: number,
        public take: number
    ) { }
}
export interface IPaging {
    skip: number;
    take: number;
}

export enum EFilterType {
    STRING,
    INTEGER,
    BOOLEAN,
    DATE,
    OBJECT,
    DATE_RANGE
}

export class SortItem implements ISortItem {
    constructor(
        public field: string,
        public sortType: ESortType
    ) { }
}

export interface ISortItem {
    field: string;
    sortType: ESortType;
}

export enum ESplitterType {
    OR = 'or',
    AND = 'and'
}

export enum ESortType {
    ASC = 'ASC',
    DESC = 'DESC',
}
