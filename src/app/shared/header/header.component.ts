import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/core/models/user.model';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    public authSvc: AuthService,
    public appSvc: AppService
  ) { }

  ngOnInit() {
    this.user = this.authSvc.getUser()
  }

  logout(){
    this.authSvc.logout()
  }

}
