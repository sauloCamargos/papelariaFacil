import { IResource } from '../interfaces/IResouce';

export class Serializer<T extends IResource> {

    constructor(private classInstance: T) { }

    fromJson(json: any): T {
        let objectCopy = Object.create(this.classInstance);
        objectCopy.fromJson(json);
        return objectCopy;
        // return Object.create(this.classInstance);
    }


    toJson(object: T): any {
        try {
            return JSON.stringify(object);
        } catch (error) {
            return JSON.stringify({});
        }
    }
}