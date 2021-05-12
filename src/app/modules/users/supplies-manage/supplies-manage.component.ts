import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSupplies } from '@app/core/models/user-supplies.model';
import { User } from '@app/core/models/user.model';
import { ProductService } from '@app/core/services/product.service';
import { UserSuppliesService } from '@app/core/services/user-supplies.service';
import { UserService } from '@app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BaseManageComponent } from 'src/app/shared/base-manage/base-manage.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-supplies-manage',
  templateUrl: './supplies-manage.component.html',
  styleUrls: ['./supplies-manage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuppliesManageComponent extends BaseManageComponent<UserSupplies> implements OnInit {

  public entityForm: FormGroup
  public entityId: number
  public parentId: number
  public entityObject: UserSupplies
  public isView: boolean
  public user: User;
  public nationalitiesList: any[]
  public selectedItems: any[]
  public productsList: any[]
  environment = environment;
  constructor(
    public entitySvc: UserSuppliesService,
    public formBuilder: FormBuilder,
    public router: Router,
    public UserSvc: UserService,
    public productSvc: ProductService,
    public toastrSvc: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  compareFunctionItemsList = function (o1: any, o2: any) {
    return o1.id == o2.id;
  }

  async ngOnInit() {
    this.parentId = +this.activatedRoute.snapshot.params.id
    this.entityId = +this.activatedRoute.snapshot.params.idSupplies
    this.isView = this.activatedRoute.snapshot.routeConfig.path == 'view/:id'
    await this.getUserData(this.parentId);
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

  cancelChangesEntity(){
    this.fillForm(this.entityObject);
    this.toastrSvc.success('As alterações nos dados da lista foram descartadas com sucesso!');
  }

  async getUserData(userId) {
    this.user = await this.UserSvc.read(userId).toPromise()
  }

  cancelSetProducts() {
    if (this.entityObject && this.entityObject.products) {

      this.selectedItems = [];
      this.productsList.forEach(
        (item) => {
          item.checked = false;
          item.quantity = null;
          let productSelected: any = this.entityObject.products.find(itemProduct => itemProduct.id == item.id);
          if (productSelected) {
            productSelected.checked = true;
            item.checked = true;
            if(productSelected.pivot){
              productSelected.quantity = productSelected.pivot.quantity;
              item.quantity = productSelected.pivot.quantity;
            }
          }
        }
      )
      this.toastrSvc.success('As alterações em produtos foram descartadas com sucesso!');
    }
  }

  setSelectProduct(event, product) {
    if (event.checked) {
      product.quantity = 1;
      if (!this.selectedItems) this.selectedItems = [];
      this.selectedItems.push(product)
    } else {
      let indexProduct = this.selectedItems.findIndex((productList) => productList.id === product.id);
      product.quantity = null;
      this.selectedItems.splice(indexProduct, 1)
    }
  }

  setProducts() {
    let products: any[] = [];
    if (this.productsList) {
      products = this.productsList.filter(item => item.checked).map((item) => { return { id: item.id, quantity: item.quantity } });
    }
    this.entitySvc.setProducts(this.entityId, { products }).subscribe(
      (response) => {
        this.entityObject.products = [...this.productsList];
        this.toastrSvc.success('Os produtos da lista foram atualizados com sucesso!');
      }
    )
  }

  async getProducts() {
    let productsListResponse = await this.productSvc.list({ qtd: -1 }).toPromise()
    this.productsList = productsListResponse.data

  }

  fillForm(entityObject) {
    this.f.name.setValue(entityObject.name);
    this.f.user_id.setValue(entityObject.user_id);

    if (entityObject.products) {
      this.selectedItems = [];
      this.productsList.forEach(
        (item) => {
          let productSelected = entityObject.products.find(itemProduct => itemProduct.id == item.id);
          if (productSelected) {
            productSelected.checked = true;
            item.checked = true;
            if(productSelected.pivot){
              productSelected.quantity = productSelected.pivot.quantity;
              item.quantity = productSelected.pivot.quantity;
            }
            this.selectedItems.push(productSelected);
          }
        }
      )
    }


    if (this.isView) {
      this.entityForm.disable()
    }
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      name: [null],
      user_id: [this.parentId, [Validators.required]]
    });
  }

  successCreateCallback = (function (response) {
    this.toastrSvc.success('Lista criada com sucesso!');
    this.router.navigate([`/admin/users/edit/${this.parentId}/supplies-list/edit/${response.id}`])
  }).bind(this)

  successUpdateCallback = (function (response) {
    this.toastrSvc.success('Lista atualizada com sucesso!');
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
