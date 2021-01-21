import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    public appSvc: AppService
  ) { }

  ngOnInit(): void {
  }

}
