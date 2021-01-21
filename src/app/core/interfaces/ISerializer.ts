import { IResource } from './IResouce';


export interface ISerializer {
    fromJson(json: any): any;
    toJson(resource: IResource): any;
}
