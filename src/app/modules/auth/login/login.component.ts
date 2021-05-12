import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {

  f: FormGroup;
  errorCredentials = false;
  inLoading: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    // $('body').addClass('bg-login');
  }

  ngOnChanges() {
    this.createForm();
    // $('body').addClass('bg-login');
  }

  createForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: ['saulo.camargos.sc@gmail.com', [Validators.required, Validators.email]],
      password: ['teste', [Validators.required]]
    });
  }

  onSubmit() {
    this.errorCredentials = false;
    this.inLoading = true;

    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.inLoading = false;
        this.router.navigate(['admin']);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse)
        if (errorResponse.status === 401) {
          this.errorCredentials = errorResponse.error.message;
        }
        this.inLoading = false;
      }
    );
  }

}
