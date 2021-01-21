import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  f: FormGroup;
  inProgress = false;
  errorCredentials: boolean

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.inProgress = true
    this.authService.resetPassword(this.f.value).subscribe(
      (resp) => {

        const $this = this;
        Swal.fire("Atenção", `${resp.message}`, "success").then(
          () => {
            $this.router.navigate(['/auth/login']);
            $this.inProgress = false;
          }
        );

      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.errors.email) {
          Swal.fire("Ops! :'(", `${errorResponse.error.errors.email.join('br')}`, "error");
        } else {
          Swal.fire("Ops! :'(", `Não foi possível enviar as instruções para reset de senha, tente novamente e em caso de persistência entre em contato com suporte.`, "error");
        }
        this.inProgress = false;
      }
    );
  }
}
