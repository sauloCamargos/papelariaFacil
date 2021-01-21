import { Directive, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums/user.enum';

@Directive({
  selector: '[secured]'
})
export class SecuredDirective {
  UserRole = UserRole;
  @Input( 'secured' )
  accessControlList: Array<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eltRef: ElementRef,
    private authSvc: AuthService
  ) {
  }

  ngAfterViewInit() {
    let hasAccess = this.checkResourcePrivelageAcl( this.accessControlList );
      if ( !hasAccess ) {
        let el: HTMLElement = this.eltRef.nativeElement;
        el.parentNode.removeChild( el );
      }
  }

  public checkResourcePrivelageAcl( privilageList: Array<string> ): boolean {
    let user;

    if (this.authSvc.check()) {
      user = this.authSvc.getUser();
    }

    if (user != null) {
      return privilageList.includes(UserRole[user.role]);
    }
    return false;
  }

}
