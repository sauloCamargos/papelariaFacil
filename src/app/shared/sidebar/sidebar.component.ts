import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums/user.enum';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  public UserRole = UserRole;
  constructor(
    public authSvc: AuthService,
    public appSvc: AppService,
    public router: Router
  ) { }


  get imageProfile() {
    if (this.authSvc && this.authSvc.getUser().image_profile) {
      return this.authSvc.getUser().image_profile.url;
    }
    return 'assets/img/user2-160x160.jpg';
  }

  ngOnInit() {
    this.checkMenuStatusToSize(window.innerWidth);
    this.router.events.subscribe(
      (event) => {
        if(event instanceof NavigationEnd){
          if(this.appSvc.getShowSidebarToggle){
            this.appSvc.setSidebarOpen(false)
          }
        }
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkMenuStatusToSize(event.target.innerWidth);
  }

  checkMenuStatusToSize(toSize){
    var minWidth = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg');
    if(parseFloat(minWidth) < toSize){
      this.appSvc.setSidebarOpen(true);
      this.appSvc.setShowSidebarToggle(false);
    }else{
      this.appSvc.setSidebarOpen(false);
      this.appSvc.setShowSidebarToggle(true);
    }
  }

}
