import { ProductService } from '@app/core/services/product.service';
import { ProductProviderService } from './../../../core/services/product-provider.service';
import { ProductProvider } from './../../../core/models/product-provider.model';
import { BaseManageComponent } from 'src/app/shared/base-manage/base-manage.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductProviderItemService } from './../../../core/services/product-provider-item.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductProviderItem } from './../../../core/models/product-provider-item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent extends BaseManageComponent<ProductProviderItem> implements OnInit {

  public entityForm: FormGroup
  public entityId: number
  public parentId: number
  public entityObject: ProductProviderItem
  public isView: boolean
  public productProvider: ProductProvider;
  public nationalitiesList: any[]
  public selectedItems: any[]
  public productsList: any[]
  environment = environment;
  constructor(
    public entitySvc: ProductProviderItemService,
    public formBuilder: FormBuilder,
    public router: Router,
    public productProviderSvc: ProductProviderService,
    public productSvc: ProductService,
    public toastrSvc: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }



  async ngOnInit() {
    this.parentId = +this.activatedRoute.snapshot.params.id
    this.entityId = +this.activatedRoute.snapshot.params.idItem
    this.isView = this.activatedRoute.snapshot.routeConfig.path == 'view/:id'
    await this.getProductProviderData(this.parentId);
    await this.getProducts();
    this.initForm();
    if (!!this.entityId) {
      this.getData(this.entityId).then(
        (response) => {
          this.fillForm(this.entityObject)
        }
      )
    }
  }

  async getProductProviderData(schoolId) {
    this.productProvider = await this.productProviderSvc.read(schoolId).toPromise()
  }

  get initialImage() {
    if (this.entityObject && this.entityObject.image) {
      return this.entityObject.image.url
    }
    return null;
  }

  get pathToSendImage() {
    return `${environment.apis.papelaria_facil_api}/v1/product-provider-items/${this.entityId}/image`;
  }


  async getProducts() {
    let productsListResponse = await this.productSvc.list({ qtd: -1 }).toPromise()
    this.productsList = productsListResponse.data

  }

  fillForm(entityObject) {
    this.f.amount.setValue(entityObject.amount);
    this.f.description.setValue(entityObject.description);
    this.f.product_id.setValue(entityObject.product_id);
    this.f.product_provider_id.setValue(entityObject.product_provider_id);

    if (this.isView) {
      this.entityForm.disable()
    }
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      amount: [null, [Validators.required]],
      product_id: [null, [Validators.required]],
      product_provider_id: [this.parentId, [Validators.required]],
      description: [null]
    });
  }

  successCreateCallback = (function (response) {
    this.toastrSvc.success('Produto adicionado com sucesso!');
    this.router.navigate([`/admin/products-provider/edit/${this.parentId}/items-list/edit/${response.id}`])
  }).bind(this)

  successUpdateCallback = (function (response) {
    this.toastrSvc.success('Produto atualizado com sucesso!');
  }).bind(this)

  errorCreateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  errorUpdateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)



}
