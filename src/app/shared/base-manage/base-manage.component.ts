import { Component, OnInit } from '@angular/core';
import { IResource } from '@app/core/interfaces/IResouce';
import { ResourceService } from '@app/core/services/resource.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

export class BaseManageComponent<T extends IResource> {
  public entitySvc: ResourceService<T>;
  public entityForm: FormGroup;
  public entityObject: T
  public entityId: number
  public isView: boolean
  public inLoading: boolean
  public formBuilder: FormBuilder;
  public router: Router;
  public activatedRoute: ActivatedRoute;

  public successCreateCallback: any;
  public errorCreateCallback: any;
  public successUpdateCallback: any;
  public errorUpdateCallback: any;

  public toast
  constructor() {
    this.toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  getData(entityId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.entitySvc.read(entityId)
        .pipe(
          finalize(
            this.completeRequest
          )
        )
        .subscribe(
          (response) => {
            this.entityObject = response;
            resolve(this.entityObject)
          },
          (error) => {
            reject(error)
          }
        )
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.entityForm.controls; }

  formatDataSend(dataSend) {
    return dataSend;
  }


  completeRequest = (function (response) {
    this.inLoading = false;
  }).bind(this)

  onSubmit() {
    let dataSend = this.entityForm.getRawValue()
    dataSend = this.formatDataSend(dataSend);
    this.inLoading = true;
    if (!!this.entityId) {
      this.entitySvc.update(this.entityId, dataSend)
        .pipe(
          finalize(
            this.completeRequest
          )
        )
        .subscribe(
          this.successUpdateCallback,
          this.errorUpdateCallback,
        )
    } else {
      this.entitySvc.create(dataSend)
        .pipe(
          finalize(
            this.completeRequest
          )
        ).subscribe(
          this.successCreateCallback,
          this.errorCreateCallback
        )
    }
  }

  setInvalidErrorsToForm(errorResponse) {
    if (errorResponse.status === 422) {
      let errorObject = errorResponse.error.errors;
      if (typeof errorObject === 'object') {
        for (const key in errorObject) {
          if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
            const element = errorObject[key];
            let control = this.entityForm.get(key);
            if (control) {
              if(Array.isArray(element) && element[0]){
                control.setErrors({ invalid: element[0] })
              }else{
                control.setErrors({ invalid: element })
              }
            }
          }
        }
      }
    }
  }
}
