import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../services/auth.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: "kt-validate-email",
  templateUrl: "./validate-email.component.html",
  styleUrls: ["./validate-email.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ValidateEmailComponent implements OnInit {
  inLoading: boolean;
  constructor(
    public authSvc: AuthService,
    public router: Router
    ) {}

  ngOnInit(): void {
    // this.resendEmail()
  }

  resendEmail() {
    this.inLoading = true;
    var token = this.authSvc.getAccessToken();
    this.authSvc.resendEmailVerifying({ token }).subscribe(
      (response: any) => {
        this.inLoading = false;
        Swal.fire("Sucesso!", `${response.message}`, "success")
      },
      (errorResponse) => {
        if(errorResponse.status == 422){
          Swal.fire("Sucesso!", `${errorResponse.error.message}`, "error").then(
            () => {

            }
          )

        }
        this.inLoading = false;
      }
    );
  }
}
