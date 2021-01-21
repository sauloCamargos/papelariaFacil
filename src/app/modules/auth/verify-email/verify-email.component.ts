import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "kt-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class VerifyEmailComponent implements OnInit {
  id: string;
  hash: string;
  inLoading: boolean;
  queryParams: any;
  stepValidation: number;
  constructor(
    public activatedRoute: ActivatedRoute,
    public authSvc: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.hash = this.activatedRoute.snapshot.params.hash;
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.stepValidation = 1;
    // this.incrementeValidate();
    this.verifyEmail({
      id: this.id,
      hash: this.hash,
      query: this.queryParams
    });
  }

  incrementeValidate() {
    if (this.stepValidation < 5) {
      setTimeout(
        (() => {
          this.stepValidation++;
          this.incrementeValidate();
        }).bind(this),
        1500
      );
    }
  }

  verifyEmail(dataSend) {
    this.stepValidation = 2;
    this.authSvc.verifyEmail(dataSend).subscribe(
      () => {
        this.inLoading = false;
        this.stepValidation = 3;
        setTimeout(
          (() => {
            this.stepValidation = 4;
            this.authSvc.setUser().subscribe(
              () => {
                this.stepValidation = 5;
              },
              () => {
                this.stepValidation = 6;
              }
            );
          }).bind(this),
          1000
        );
      },
      error => {
        this.inLoading = false;
        if (error.status == 403) {
        }
        Swal.fire(
          "Ops!",
          "O link de confirmação não é valido, solicite outro link e tente novamente.",
          "error"
        ).then(() => {
          // this.router.navigate(["/auth/validate-email"]);
        });
      }
    );
  }

  goToDashboard(){
    this.router.navigate(['/']);
  }
}
