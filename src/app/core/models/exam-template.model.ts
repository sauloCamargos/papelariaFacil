import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';

export class ExamTemplate extends Resource implements IResource {
    name: string;
    layout: string;
    exam_id: number;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
