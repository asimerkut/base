import { IDefItem } from 'app/shared/model/def-item.model';

export class SubmitEvent {
    id: number;
    cellId: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    ders: IDefItem;
    dersSira: number;
    dersAdet: number;
}
