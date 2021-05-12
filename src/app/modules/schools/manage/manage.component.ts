import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '@app/core/models/school.model';
import { IBGEService } from '@app/core/services/ibge.service';
import { SchoolService } from '@app/core/services/school.service';
import { BaseManageComponent } from 'src/app/shared/base-manage/base-manage.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent extends BaseManageComponent<School> implements OnInit {

  public entityForm: FormGroup
  public entityId: number
  public entityObject: School
  public isView: boolean
  public statesList: any[]
  public citiesList: any[]
  public nationalitiesList: any[]
  environment = environment;
  constructor(
    public entitySvc: SchoolService,
    public formBuilder: FormBuilder,
    public router: Router,
    public ibgeSvc: IBGEService,
    public activatedRoute: ActivatedRoute,
    private toastrSvc: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.entityId = +this.activatedRoute.snapshot.params.id
    this.isView = this.activatedRoute.snapshot.routeConfig.path == 'view/:id'

    this.initForm();
    if (!!this.entityId) {
      this.getData(this.entityId).then(
        (response) => {
          this.fillForm(this.entityObject)
        }
      )
    }

    this.getStates();
  }

  fillForm(entityObject) {
    this.f.name.setValue(entityObject.name);
    this.f.state.setValue(entityObject.state);
    this.f.city.setValue(entityObject.city);

    if(entityObject.state){
      this.getCitiesOfUf(entityObject.state)
    }

    if (this.isView) {
      this.entityForm.disable()
    }
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  successCreateCallback = (function (response) {
    this.router.navigate(['/admin/schools/edit',response.id])
    this.toastrSvc.success("Escola cadastrada com sucesso!")
  }).bind(this)

  successUpdateCallback = (function (response) {
    this.toastrSvc.success("Escola atualizada com sucesso!")
    this.router.navigate(['/admin/schools'])
  }).bind(this)

  errorCreateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  errorUpdateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  getStates() {
    this.ibgeSvc.listStates({
      orderBy: 'nome'
    }).subscribe(
      (response) => {
        this.statesList = response;
      }
    )
  }

  cancelChangesEntity(){
    this.fillForm(this.entityObject);
    this.toastrSvc.success('As alterações nos dados da lista foram descartadas com sucesso!');
  }


  setCitiesList(){
    this.getCitiesOfUf(this.entityForm.get('state').value);
    this.entityForm.get('city').setValue(null);
  }

  getCitiesOfUf(uf) {
    this.ibgeSvc.listCities(uf,{
      orderBy: 'nome'
    }).subscribe(
      (response) => {
        this.citiesList = response;
      }
    )
  }





}
