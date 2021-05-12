import { DomSanitizer } from '@angular/platform-browser';
import { QuoteType } from './../../../core/enums/quote.enum';
import { QuoteService } from './../../../core/services/quote.service';
import { SchoolSuppliesService } from './../../../core/services/school-supplies.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { School } from '@app/core/models/school.model';
import { SchoolSupplies } from '@app/core/models/school-supplies.model';
import { SchoolService } from '@app/core/services/school.service';

@Component({
  selector: 'app-make-quote',
  templateUrl: './make-quote.component.html',
  styleUrls: ['./make-quote.component.scss']
})
export class MakeQuoteComponent implements OnInit {
  entityForm: FormGroup
  inLoading: boolean;
  schoolsList: School[] = [];
  schoolSuppliesLists: SchoolSupplies[]

  rankProviders: any[];
  constructor(
    public formBuilder: FormBuilder,
    public schoolSvc: SchoolService,
    public quoteSvc: QuoteService,
    public schoolSuppliesSvc: SchoolSuppliesService,
    public domSanitizer : DomSanitizer
  ) { }

  async ngOnInit() {
    await this.getSchoolslist()
    this.initForm()
    // this.onSubmit()
  }

  get f() { return this.entityForm.controls; }

  fillForm(entityObject) {
    this.f.school_id.setValue(entityObject.school_id);
    this.f.supplies_list_id.setValue(entityObject.supplies_list_id);
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      school_id: [null, [Validators.required]],
      supplies_list_id: [null, [Validators.required]]
    });
  }

  async getSchoolslist() {
    let schoolsResponse = await this.schoolSvc.list({ qtd: -1 }).toPromise();
    this.schoolsList = schoolsResponse.data;
  }

  setSuppliesLists() {
    this.getSuppliesListsOfSchool(this.entityForm.get('school_id').value);
    this.entityForm.get('supplies_list_id').setValue(null);
  }

  getSuppliesListsOfSchool(schoolId) {
    this.schoolSuppliesSvc.list({ qtd: -1, school_id: schoolId }).subscribe(
      (response) => {
        this.schoolSuppliesLists = response.data;
      }
    )
  }

  onSubmit() {
    let dataSend = this.entityForm.getRawValue()
    // let dataSend = { "school_id": 2, "supplies_list_id": 1, "quote_type": 1 };
    dataSend.quote_type = QuoteType.SUPPLIES_LIST;

    this.quoteSvc.create(dataSend)
      .subscribe(
        (successResponse) => {
          this.rankProviders = successResponse.data;
          // this.rankProviders.map(
          //   (item)=> {
          //     item.brand_url = this.domSanitizer.bypassSecurityTrustUrl(item.brand_url)
          //     return item;
          //   }
          // )
        },
        (errorResponse) => {

        }
      )

  }



}
