import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/core/services/role.service';
import { BaseManageComponent } from 'src/app/shared/base-manage/base-manage.component';
import { environment } from 'src/environments/environment';
import { ProductProvider } from './../../../core/models/product-provider.model';
import { ProductProviderService } from './../../../core/services/product-provider.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent extends BaseManageComponent<ProductProvider> implements OnInit {

  public entityForm: FormGroup
  public entityId: number
  public entityObject: ProductProvider
  public isView: boolean
  public statusList: any[]
  public nationalitiesList: any[]
  environment = environment;
  constructor(
    public entitySvc: ProductProviderService,
    public formBuilder: FormBuilder,
    public router: Router,
    public roleSvc: RoleService,
    public toastrSvc: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.entityId = +this.activatedRoute.snapshot.params.id
    this.isView = this.activatedRoute.snapshot.routeConfig.path == 'view/:id'

    this.initForm();
    this.getStatusList()
    if (!!this.entityId) {
      this.getData(this.entityId).then(
        (response) => {
          this.fillForm(this.entityObject);
        }
      )
    }

  }

  get initialImage() {
    if (this.entityObject && this.entityObject.brand) {
      return this.entityObject.brand.url
    }
    return null;
  }

  get pathToSendImage() {
    return `${environment.apis.papelaria_facil_api}/v1/product-providers/${this.entityId}/brand`;
  }

  fillForm(entityObject) {
    this.f.name.setValue(entityObject.name);
    this.f.company_name.setValue(entityObject.company_name);
    this.f.cnpj.setValue(entityObject.cnpj);
    this.f.phone.setValue(entityObject.phone);
    this.f.status.setValue(entityObject.status);

    if (this.isView) {
      this.entityForm.disable()
    }
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      company_name: [null, [Validators.required]],
      cnpj: [null],
      phone: [null],
      status: [null, [Validators.required]]
    });
  }

  successCreateCallback = (function (response) {
    this.router.navigate(['/admin/products-provider/edit', response.id])
    this.toastrSvc.success("Fornecedor criado com sucesso!")
  }).bind(this)

  successUpdateCallback = (function (response) {
    this.toastrSvc.success("Fornecedor atualizado com sucesso!")
  }).bind(this)

  errorCreateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  errorUpdateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  getStatusList() {
    this.entitySvc.getStatuslist().subscribe(
      (response) => {
        this.statusList = response
      }
    )
  }



}
