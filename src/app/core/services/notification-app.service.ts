import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarErrorLayoutComponent } from '@app/shared/snack-bar-error-layout/snack-bar-error-layout.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationAppService {

  constructor(
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    private zone: NgZone
    ) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      // this.snackBar.open(message, 'X', {panelClass: ['error']});
      this.toastr.error(message,"Error!");
      // this.snackBar.openFromComponent(SnackBarErrorLayoutComponent,
      //   {
      //     panelClass: ['error'],
      //     duration: 3500,
      //     horizontalPosition: 'end',
      //     verticalPosition: 'top',
      //     data:{
      //       title: "Error!",
      //       message
      //     }
      //   });
    });
  }
}
