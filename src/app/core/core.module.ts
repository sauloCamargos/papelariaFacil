import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';
import { UserService } from '@app/core/services/user.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  exports: [
  ],
  providers: [
    UserService,
    // { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
})
export class CoreModule { }
