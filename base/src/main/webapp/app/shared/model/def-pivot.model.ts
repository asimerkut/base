export interface IDefPivot {
    id?: number;
    code?: string;
    pvtSql?: any;
    pvtVal?: string;
    pvtCol?: string;
    pvtRow?: string;
}

export class DefPivot implements IDefPivot {
    constructor(
        public id?: number,
        public code?: string,
        public pvtSql?: any,
        public pvtVal?: string,
        public pvtCol?: string,
        public pvtRow?: string
    ) {}
}
