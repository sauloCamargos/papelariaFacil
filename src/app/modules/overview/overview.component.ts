import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    public appSvc: AppService
  ) { }

  ngOnInit(): void {
  }

}
