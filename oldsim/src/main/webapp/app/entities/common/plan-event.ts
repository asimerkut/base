import {DefItem} from '../def-item';

export class PlanEvent {
    id: number;
    cellId: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    ders: DefItem;
    dersSira: number;
    dersAdet: number;
}
