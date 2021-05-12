import { IResource } from '../interfaces/IResouce';

export abstract class Resource implements IResource {
    public id: number;
    public created_at: Date;
    public updated_at: Date;


    constructor(objectJson?: any) {
        this.fromJson(objectJson);
    }

    fromJson(objectJson?: Resource) {
        for (const key in objectJson) {
            if (objectJson.hasOwnProperty(key) ) {
                this[key] = objectJson[key];
            }
        }
    }


}
