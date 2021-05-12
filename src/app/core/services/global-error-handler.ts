import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '@app/core/services/error.service';
import { LoggingService } from '@app/core/services/logging.service';
import { NotificationAppService } from '@app/core/services/notification-app.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationAppService);

    let message, stackTrace, erroServer;
    if (error instanceof HttpErrorResponse) {
      // Server error
      erroServer = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);

      if (error.status == 422) {
        message = erroServer.message;
      }

      if (error.status == 0) {
        message = `Ocorreu um erro inesperado na aplicação. Tente novamente, em caso de persistencia entre em contato com o suporte.`;
      }



      notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      // notifier.showError(message);
    }
    // Always log errors
    logger.logError(message, stackTrace);
    console.error(error);
  }
}
