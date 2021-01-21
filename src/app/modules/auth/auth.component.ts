import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit() {
    // $('body').addClass('bg-login');
  }

  ngOnChanges() {
    // $('body').addClass('bg-login');
  }

}
