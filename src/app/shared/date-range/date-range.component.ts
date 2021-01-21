import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import * as moment from 'moment'
// import * as $ from 'jquery'
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {
  dateRange: any;
  dateRangeId: any;
  @Output() setRange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.dateRangeId = new Date().getTime();
    setTimeout(() => {
      this.initDateRange();
    }, 500);
  }

  initDateRange() {
    let $this = this
    var dateRange = undefined
    // moment.tz.setDefault('America/Sao_Paulo');
    this.dateRange = $("#"+$this.dateRangeId).daterangepicker(
        {
          timePicker: false,
          timePickerIncrement: 10,
          timePicker24Hour: true,
          ranges: {
            'Hoje'            : [moment(), moment()],
            'Ontem'           : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Ultimos 7 dias'  : [moment().subtract(6, 'days'), moment()],
            'Ultimos 30 dias' : [moment().subtract(29, 'days'), moment()],
            'Este mês'        : [moment().startOf('month'), moment().endOf('month')],
            'Mês passado'     : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          locale: {
            'applyLabel': 'Selecionar',
            'cancelLabel': 'Cancelar',
            'fromLabel': 'De',
            'toLabel': 'Até',
            'customRangeLabel': 'Periodo'
          },
          startDate: moment().startOf('month'),
          endDate: moment().endOf('month'),
        },
        function (start, end) {
          let startDate = moment(start).startOf('day').tz('America/Sao_Paulo').format();
          let endDate = moment(end).endOf('day').tz('America/Sao_Paulo').format();

          const dataEmmit = {
            start: startDate,
            end: endDate
          };

          $this.setRange.emit(dataEmmit)

          $('#' + $this.dateRangeId + ' span').html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'))

        });
    }


}
