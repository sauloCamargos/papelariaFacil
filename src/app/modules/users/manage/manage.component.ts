import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { BaseManageComponent } from 'src/app/shared/base-manage/base-manage.component';
import { MustMatch } from 'src/app/shared/validators/must-match';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent extends BaseManageComponent<User> implements OnInit {

  public entityForm: FormGroup
  public entityId: number
  public entityObject: User
  public isView: boolean
  public rolesList: any[]
  public nationalitiesList: any[]
  environment = environment;
  constructor(
    public entitySvc: UserService,
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
    if (!!this.entityId) {
      this.getData(this.entityId).then(
        (response) => {
          this.fillForm(this.entityObject)
          this.f.password.clearValidators()
          this.f.password_confirmation.clearValidators()

          this.f.password.updateValueAndValidity()
          this.f.password_confirmation.updateValueAndValidity()
        }
      )
    }

    this.getRoles();
  }

  fillForm(entityObject) {
    this.f.name.setValue(entityObject.name);
    this.f.email.setValue(entityObject.email);
    this.f.role.setValue(entityObject.role);

    if (this.isView) {
      this.entityForm.disable()
    }
  }

  initForm() {
    this.entityForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    }, {
      validator: MustMatch('password')
    });
  }

  successCreateCallback = (function (response) {
    this.router.navigate(['/admin/users'])
    this.toastrSvc.success("Usuário criado com sucesso!")
  }).bind(this)

  successUpdateCallback = (function (response) {
    this.toastrSvc.success("Usuário atualizado com sucesso!")
    this.router.navigate(['/admin/users'])
  }).bind(this)

  errorCreateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  errorUpdateCallback = (function (errorResponse) {
    this.setInvalidErrorsToForm(errorResponse);
    throw (errorResponse);
  }).bind(this)

  getRoles() {
    this.roleSvc.list().subscribe(
      (response) => {
        this.rolesList = response
      }
    )
  }





}
