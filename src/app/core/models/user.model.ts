import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';
import { Role } from './role.model';
import { Attachment } from '@app/core/models/attachment.model';
import { Doctor } from '@app/core/models/doctor.model';

export class User extends Resource implements IResource {
    name: string;
    username: string;
    cpf: string;
    email: string;
    email_verified_at: Date;
    image_profile: Attachment
    role: number

    constructor(objectJson?: any) {
        super(objectJson);
    }

}
