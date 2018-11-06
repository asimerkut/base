import { IPerPerson } from 'app/shared/model//per-person.model';

export interface IPerDaily {
    id?: number;
    dersSira?: number;
    hourStart?: string;
    hourFinish?: string;
    person?: IPerPerson;
}

export class PerDaily implements IPerDaily {
    constructor(
        public id?: number,
        public dersSira?: number,
        public hourStart?: string,
        public hourFinish?: string,
        public person?: IPerPerson
    ) {}
}
