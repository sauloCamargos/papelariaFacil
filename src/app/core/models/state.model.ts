import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';

export class State extends Resource implements IResource {
    nome: string;
    sigla: string;

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
