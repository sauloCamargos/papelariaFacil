import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';

export class Exam extends Resource implements IResource {
    name: string;
    type: number;
    number_templates: number;
    description: string;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
