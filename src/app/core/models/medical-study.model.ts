import { IResource } from '../interfaces/IResouce';
import { extend } from 'webdriver-js-extender';
import { Resource } from './resource.model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Exam } from '@app/core/models/exam.model';
import { Doctor } from '@app/core/models/doctor.model';
import { MedicalReport } from '@app/core/models/medical-report.model';
export class MedicalStudy extends Resource implements IResource {

  patient_id: string
  patient_name: string
  patient_sex: string
  patient_birthdate: string
  station_manufacturer: string
  station_manufacturer_name: string
  station_name: string
  study_instance_uid: string
  study_date: string
  study_time: string
  study_id: string
  study_accession_number: string
  study_description: string
  study_series_number: string
  study_instances_number: string
  study_modality: string
  study_institution_name: string
  sent_from_ae: string
  sent_to_ae: string
  observation: string
  status: string
  classification: string
  exam_id: number
  doctor_id: number
  verified_at: string
  started_at: string
  relesead_at: string
  series_count: number;
  images_count: number;
  exam: Exam
  doctor: Doctor
  medical_report: MedicalReport


  constructor(objectJson?: any) {
    super(objectJson);
  }

  fromJson(objectJson?: any) {
    this.id = (objectJson) ? objectJson.pk : null;
    this.study_description = (objectJson) ? objectJson.study_desc : null;
    this.patient_name = (objectJson && objectJson.patient) ? objectJson.patient.pat_name : null;
    this.patient_sex = (objectJson && objectJson.patient) ? objectJson.patient.pat_sex : null;
    this.patient_birthdate = (objectJson && objectJson.patient) ? objectJson.patient.pat_birthdate : null;
    this.study_modality = (objectJson && objectJson.metadata) ? objectJson.metadata.mods_in_study : null;
    this.series_count = (objectJson && objectJson.metadata) ? objectJson.metadata.num_series : null;
    this.images_count = (objectJson && objectJson.metadata) ? objectJson.metadata.num_instances : null;
    this.observation = (objectJson) ? objectJson.observation : null;
    this.status = (objectJson) ? objectJson.status : null;
    this.classification = (objectJson) ? objectJson.classification : null;
    this.exam_id = (objectJson) ? objectJson.exam_id : null;
    this.doctor_id = (objectJson) ? objectJson.doctor_id : null;
    this.verified_at = (objectJson) ? objectJson.verified_at : null;
    this.started_at = (objectJson) ? objectJson.started_at : null;
    this.relesead_at = (objectJson) ? objectJson.relesead_at : null;

    if(this.patient_birthdate){
      this.patient_birthdate = moment(this.patient_birthdate).format(environment.date_format_server);
    }

  }

  getAgePatient() {
    var a = moment();
    var b = moment(this.patient_birthdate, environment.date_format_server);

    var years = a.diff(b, 'year');
    b.add(years, 'years');

    var months = a.diff(b, 'months');
    b.add(months, 'months');

    var days = a.diff(b, 'days');

    return ` ${years}a ${months}m ${days}d`;
  }

}
