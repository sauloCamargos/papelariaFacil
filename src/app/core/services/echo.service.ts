import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class EchoService {
  echoServer: Echo;
  constructor(
    private notificationSvc: NotificationService
  ) {
    // this.echoServer = new Echo({
    //   broadcaster: 'pusher',
    //   key: environment.mix_pusher_app_key,
    //   cluster: environment.mix_pusher_app_cluster,
    //   wsHost: window.location.hostname,
    //   wsPort: 6001
    // });

    // this.registerMainChannel()
  }
  registerMainChannel(){
   
      this.echoServer.channel('main')
        .listen('NewSolicitation', (e) => {
          let data: Array<any> = [];
          data.push({
            'title': 'Nova solicitação registrada',
            'alertContent': e.solicitation.patient_code +' '+ e.solicitation.patient_name
          });
          this.notificationSvc.generateNotification(data);
        })            
      this.echoServer.channel('main')
        .listen('FinishSolicitation', (e) => {
          let data: Array<any> = [];
          data.push({
            'title': 'Solicitação fechada',
            'alertContent': e.solicitation.patient_code +' '+ e.solicitation.patient_name
          });
          this.notificationSvc.generateNotification(data);
        })            
  
    
  }
}
