import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public appSvc: AppService
  ) { }

  ngOnInit(): void {
  }

}
