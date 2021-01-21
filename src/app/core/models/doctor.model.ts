import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class Doctor extends Resource implements IResource {
    name: string;
    crm: string;
    signature: Attachment;
    user_id: number

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
