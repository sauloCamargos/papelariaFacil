import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class StatusExam extends Resource implements IResource {    

    constructor(objectJson?: any) {
        super(objectJson);
    }

}