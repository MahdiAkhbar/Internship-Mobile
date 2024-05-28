import { Component, OnInit, ViewChild } from '@angular/core';

import { IGraphType } from '../../../../shared/interfaces/graphType';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { StockService } from '../../../../shared/services/stock.service';
import { interval, mergeMap, startWith, switchMap } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {

  constructor(
    private stockService: StockService
  ) { }

  graphType: IGraphType[] = [
    { value: 'line', viewValue: 'خطی' },
    { value: 'bar', viewValue: 'میله ای' },
    { value: 'shami-2', viewValue: 'شمعی' }
  ];
  graphDuration: IGraphType[] = [
    { value: 'day-1', viewValue: 'امروز' },
    { value: 'week-2', viewValue: 'هفته جاری' },
    { value: 'shami-3', viewValue: 'ماهانه' },
    { value: 'shami-4', viewValue: 'سالانه' }
  ];
  graphTimeframe: IGraphType[] = [
    { value: 'shami-1', viewValue: '۵ دقیقه‌ای' },
    { value: 'shami-2', viewValue: '۱۵ دقیقه‌ای' },
    { value: 'shami-3', viewValue: '۱ ساعت' }
  ];

  chartData = []

  sellectedGraphType: any = this.graphType[0].value;
  sellectedGraphDuration: string = this.graphDuration[0].value;
  sellectedGraphTimeframe: string = this.graphTimeframe[0].value;

  public chartOptions!: ChartOptions;

  ngOnInit(): void {
    this.stockService.insCode.pipe(
      switchMap((ins) => interval(5 * 60 * 1000).pipe(
        startWith(0),
        mergeMap(() => this.stockService.getChartInfo(ins))
      ))
    ).subscribe(res => {
      // let data: number[] = [];
      let data: { x: number, y: number }[] = [];
      res.forEach(item => {
        let time = item.eventClock;
        let s = time % 100;
        time = Math.floor(time / 100);
        let m = time % 100;
        time = Math.floor(time / 100);
        let h = time;
        let date = new Date();
        date.setHours(h);
        date.setMinutes(m);
        date.setSeconds(s);
        data.push({
          x: date.getTime(),
          y: item.closePrice
        });
      });

      this.chartOptions = {
        series: [{
          name: 'آخرین: ',
          data: data
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'HH:mm'
          }
        },
        chart: {
          type: 'line'
        }
      }
    });
  }


}
