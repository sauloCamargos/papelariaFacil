import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  @Input() rankProviders;
  @Output()  changeSelect = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  selectItem(rankProvider){
    this.changeSelect.emit(rankProvider)
  }
}
