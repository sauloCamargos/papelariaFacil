import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environments/environment';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './../services/auth.service';
import { User } from '@app/core/models/user.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${environment.apis.papelaria_facil_api}/v1/auth`).subscribe(data => {
      this.user = data;
    });
  }

}
