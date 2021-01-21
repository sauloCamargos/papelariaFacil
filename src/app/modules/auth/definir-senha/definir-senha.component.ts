import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordValidation } from '@app/shared/validators/password-validation/password-validation';
// import { PasswordValidation } from '../../shared/validators/password-validation/password-validation';
import Swal from 'sweetalert2'

declare var $: any;
declare var bootbox: any;
declare var toastr: any;
@Component({
  selector: 'app-definir-senha',
  templateUrl: './definir-senha.component.html',
  styleUrls: ['./definir-senha.component.css']
})
export class DefinirSenhaComponent implements OnInit {

  f: FormGroup;
  errorCredentials = false;
  token: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.token = this.activeRoute.snapshot.params['token'];
    this.activeRoute.params.subscribe(
      params => {
        this.token = params['token'];
        if (this.token) {
          this.createForm(this.token);
        }
      }
    );
  }

  createForm(token) {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      token: [token, Validators.required],
      password_confirmation: [null, Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  setPassword(value: any) {
    if ((this.f.controls.email.errors !== null) && this.f.controls.email.errors.required) {
      bootbox.alert({
        title: 'Atenção',
        className: 'error-alert',
        message: 'Informe e-mail para validarmos sua solicitação!'
      });
      return;
    }

    if ((this.f.controls.password.errors !== null) && this.f.controls.password.errors.required) {
      bootbox.alert({
        title: 'Atenção',
        className: 'error-alert',
        message: 'Informe a nova senha!'
      });
      return;
    }

    if ((this.f.controls.password_confirmation.errors !== null) && this.f.controls.password_confirmation.errors.MatchPassword) {
      bootbox.alert({
        title: 'Atenção',
        className: 'error-alert',
        message: 'As senhas não coicidem, verifique-as e tente novamente!'
      });
      return;
    }
    this.authService.setNewPassword(this.f.value).subscribe(
      (response) => {

        Swal.fire("Uhuuuuu! \o/", `${response.message}`, "success").then(
          (response) => {
            this.router.navigate(['/auth/login']);
          }
        );

      },
      (errorResponse) => {
        var errors = errorResponse.error.errors;
        let errosMessage = '';


        if (errors.password) {
          errosMessage += errors.password.join('<br>') + ' <br>';
        }

        if (errors.password_confirmation) {
          errosMessage += errors.password.join('<br>') + ' <br>';
        }

        if (errors.email) {
          errosMessage += errors.email.join('<br>') + ' <br>';
        }

        if (!!errosMessage) {
          Swal.fire("Ops! :'(", `${errosMessage}`, "error");
          return
        }

        Swal.fire("Ops! :'(", `Não foi possível redefinir a senha, tente novamente e em caso de persistência entre em contato com suporte.`, "error");

      }
    );

  }


  createSetPasswordForm() {
    this.f = this.formBuilder.group({
      oldpassword: [null, [Validators.required]],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }
}

