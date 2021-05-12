import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';


export class Attachment extends Resource implements IResource {
   dir: string;
   name: string;
   size: string;
   file: string;
   mime: string;
   type: string;
   url: string;

   constructor(objectJson?: any) {
      super(objectJson);
  }

}
