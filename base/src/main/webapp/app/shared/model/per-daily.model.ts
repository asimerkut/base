import { IPerCompany } from 'app/shared/model//per-company.model';

export interface IPerDaily {
    id?: number;
    dersSira?: number;
    hourStart?: string;
    hourFinish?: string;
    okul?: IPerCompany;
}

export class PerDaily implements IPerDaily {
    constructor(
        public id?: number,
        public dersSira?: number,
        public hourStart?: string,
        public hourFinish?: string,
        public okul?: IPerCompany
    ) {}
}
