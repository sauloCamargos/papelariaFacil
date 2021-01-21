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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.errorCredentials = false;
    this.inLoading = true;

    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.inLoading = false;
        this.router.navigate(['overview']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
        this.inLoading = false;
      }
    );
  }

}
