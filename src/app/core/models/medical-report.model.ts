import { IResource } from '@app/core/interfaces/IResouce';
import { Resource } from '@app/core/models/resource.model';

export class MedicalReport extends Resource implements IResource {

  report: string;
  medical_studies_id: number;

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
