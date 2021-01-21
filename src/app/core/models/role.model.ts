import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';

export class Role extends Resource implements IResource {    
    name: string;
    display_name: string;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}