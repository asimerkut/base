import { IPerValue } from 'app/shared/model//per-value.model';
import { IPerDaily } from 'app/shared/model//per-daily.model';
import { IUser } from 'app/core/user/user.model';

export interface IPerPerson {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    shift1?: number;
    shift2?: number;
    shift3?: number;
    valLists?: IPerValue[];
    dailyLists?: IPerDaily[];
    loginUser?: IUser;
}

export class PerPerson implements IPerPerson {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
        public shift1?: number,
        public shift2?: number,
        public shift3?: number,
        public valLists?: IPerValue[],
        public dailyLists?: IPerDaily[],
        public loginUser?: IUser
    ) {}
}
