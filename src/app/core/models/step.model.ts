import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class Step  extends Resource implements IResource {
    name: string;
    description: string;
    next_steps: any;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
