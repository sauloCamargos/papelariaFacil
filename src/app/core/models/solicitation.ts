import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class Solicitation extends Resource implements IResource {    
    name: string;
    description: string;
    patient_code:string;
    exams:string;
    note:string;
    patient_name:string;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}