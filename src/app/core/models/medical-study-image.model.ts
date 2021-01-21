import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';

export class MedicalStudyImage extends Resource implements IResource {
  medical_studies_id: string
  series_number: string
  instance_number: string
  sop_instance: string
  transfer_syntax: string
  body_part_examined: string
  image_date: string


  constructor(objectJson?: any) {
    super(objectJson);
  }

}
