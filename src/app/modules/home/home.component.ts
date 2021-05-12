import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  thumbs = [
    {
      title:'Pesquisou',
      content:'Selecione a Escola e Ano Letivo.',
      image: '/assets/img/search_thumb_image.svg'
    },
    {
      title:'Comparou',
      content:'Escolha entre o Menor Orçamento, o fornecedor Mais Próximo ou como preferir.',
      image: '/assets/img/analise_thumb_image.svg'
    },
    {
      title:'Comprou',
      content:'Selecione a Forma de Pagamento e pronto!!',
      image: '/assets/img/buy_thumb_image.svg'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
