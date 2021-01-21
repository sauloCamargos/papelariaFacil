import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';
import { Exam } from '@app/core/models/exam.model';

export class ContractExam extends Resource implements IResource {
  price: string;
  exam_id: string;
  contract_id: string;
  classification: number;
  exam?: Exam

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
