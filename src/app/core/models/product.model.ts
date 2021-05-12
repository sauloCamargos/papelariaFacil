import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class Product extends Resource implements IResource {
    name: string;
    description: string;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
