import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-error-layout',
  templateUrl: './snack-bar-error-layout.component.html',
  styleUrls: ['./snack-bar-error-layout.component.scss']
})
export class SnackBarErrorLayoutComponent implements OnInit {

  constructor(
    public snackRef: MatSnackBarRef<SnackBarErrorLayoutComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
