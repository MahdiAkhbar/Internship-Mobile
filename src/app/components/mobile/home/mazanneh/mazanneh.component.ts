import { Component, OnInit } from '@angular/core';
import { IMazanneh } from '../../../../shared/interfaces/mazanneh';
import { StockService } from '../../../../shared/services/stock.service';
import { distinctUntilChanged, interval, mergeMap, startWith, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-mazanneh',
  templateUrl: './mazanneh.component.html',
  styleUrl: './mazanneh.component.css'
})
export class MazannehComponent implements OnInit {
  constructor(
    private stockService: StockService
  ) { }

  mazanneh!: IMazanneh[];
  maxSupplyVolume!: number
  maxDemandVolume!: number

  ngOnInit(): void {
    this.stockService.insCode.pipe(
      distinctUntilChanged(),
      switchMap((ins) => interval(5 * 60 * 1000).pipe(
        startWith(0),
        mergeMap(() => this.stockService.getStockMazanneh(ins).pipe(
          take(1)
        ))
      ))
    ).subscribe(res => {
      this.mazanneh = res;
      this.maxSupplyVolume = this.stockService.getMazannehMaxSupplyVolume();
      this.maxDemandVolume = this.stockService.getMazannehMaxDemandVolume();
    })
  }

  getSupplyBackgroundWidth(val: number) {
    return 100 * val / this.maxSupplyVolume;
  }

  getDemandBackgroundWidth(val: number) {
    return 100 * val / this.maxDemandVolume;
  }

}
