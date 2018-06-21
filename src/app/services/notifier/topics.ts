import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import { InjectionToken } from '@angular/core';

export const USERS_TOPIC = 'users';
export const HOSPITALS_TOPIC = 'hospitals';
export const DOCTORS_TOPIC = 'doctors';

export const TopicsList = [[USERS_TOPIC], [HOSPITALS_TOPIC], [DOCTORS_TOPIC]];
export const Topics = {
    [USERS_TOPIC]: {
        objectClass: User
    },
    [HOSPITALS_TOPIC]: {
        objectClass: Hospital
    },
    [DOCTORS_TOPIC]: {
        objectClass: Doctor
    }
};
export const TOPICS_LIST = new InjectionToken('topics_list');
export const TOPICS = new InjectionToken('topics');

export const TOPICS_PROVIDER = [
    { provide: TOPICS, useValue: Topics },
    { provide: TOPICS_LIST, useValue: TopicsList}
];

