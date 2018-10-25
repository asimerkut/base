import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {} from 'rxjs';
@Injectable()
export class ScheduleService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const data: any = [
            {
                title: 'All Day Event',
                start: yearMonth + '-01'
            },
            {
                title: 'Long Event',
                start: yearMonth + '-07',
                end: yearMonth + '-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: yearMonth + '-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: yearMonth + '-16T16:00:00'
            },
            {
                title: 'Conference',
                start: yearMonth + '-11',
                end: yearMonth + '-13'
            },
            {
                title: 'Meeting',
                start: yearMonth + '-12T10:30:00',
                end: yearMonth + '-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: yearMonth + '-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: yearMonth + '-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: yearMonth + '-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: yearMonth + '-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: yearMonth + '-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: yearMonth + '-28'
            }
        ];
        return of(data);
    }

    public getTouristPlaces(): any[] {
        const data: any = [
            {
                data: [
                    {
                        data: {
                            name: 'Asia',
                            days: '15',
                            type: 'Continent'
                        },
                        children: [
                            {
                                data: {
                                    name: 'India',
                                    days: '6',
                                    type: 'Country'
                                },
                                children: [
                                    {
                                        data: {
                                            name: 'Goa',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Mumbai',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Hyderabad',
                                            days: '2',
                                            type: 'City'
                                        }
                                    }
                                ]
                            },
                            {
                                data: {
                                    name: 'Singapore',
                                    days: '3',
                                    type: 'Country'
                                },
                                children: [
                                    {
                                        data: {
                                            name: 'Woodlands',
                                            days: '3',
                                            type: 'City'
                                        }
                                    }
                                ]
                            },
                            {
                                data: {
                                    name: 'Indonesia',
                                    days: '6',
                                    type: 'Country'
                                },
                                children: [
                                    {
                                        data: {
                                            name: 'Bali',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Lombok',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Batam',
                                            days: '2',
                                            type: 'City'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        data: {
                            name: 'Australia',
                            days: '9',
                            type: 'Continent'
                        },
                        children: [
                            {
                                data: {
                                    name: 'Perth',
                                    days: '3',
                                    type: 'City'
                                }
                            },
                            {
                                data: {
                                    name: 'Brisbane',
                                    days: '3',
                                    type: 'City'
                                }
                            },
                            {
                                data: {
                                    name: 'Sydney',
                                    days: '3',
                                    type: 'City'
                                }
                            }
                        ]
                    },
                    {
                        data: {
                            name: 'Europe',
                            days: '8',
                            type: 'Continent'
                        },
                        children: [
                            {
                                data: {
                                    name: 'Germany',
                                    days: '4',
                                    type: 'Country'
                                },
                                children: [
                                    {
                                        data: {
                                            name: 'Hamburg',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Berlin',
                                            days: '2',
                                            type: 'City'
                                        }
                                    }
                                ]
                            },

                            {
                                data: {
                                    name: 'UK',
                                    days: '4',
                                    type: 'Country'
                                },
                                children: [
                                    {
                                        data: {
                                            name: 'Hamburg',
                                            days: '2',
                                            type: 'City'
                                        }
                                    },
                                    {
                                        data: {
                                            name: 'Berlin',
                                            days: '2',
                                            type: 'City'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        return data;
    }
}
