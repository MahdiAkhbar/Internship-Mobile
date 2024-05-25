import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ISearch } from '../interfaces/search.interface';
import { IStock } from '../interfaces/stock-info.interface';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ILastTrade } from '../interfaces/stock-last-trade.interface';
import { IMazanneh } from '../interfaces/mazanneh';
import { UserService } from './user.service';
import { IChart } from '../interfaces/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    @Inject('API_URL') private apiUrl: string
  ) { }

  lastInsCode: string = this.getInsCode();
  insCode: BehaviorSubject<string> = new BehaviorSubject(this.lastInsCode);
  mazannehMaxSupplyVolume!: number;
  mazannehMaxDemandVolume!: number;

  search(arg: string) {
    return this.http.get<ISearch[]>(this.apiUrl + '/tse/search/' + arg);
  }

  setInsCode(ins: string) {
    localStorage.setItem('ins-code', ins);
  }

  getInsCode() {
    let ins = localStorage.getItem('ins-code');
    if (ins)
      return ins;
    else {
      let user = this.userService.getUser();
      if (user)
        if (user.favorites.length > 0) {
          ins = user.favorites[0].insCode;
          return ins;
        }
    }
    return '48990026850202503';
  }

  getStockInfo(ins: string) {
    return this.http.get<IStock>(this.apiUrl + '/tse/stock_info/' + ins);
  }

  getLastTrade(ins: string) {
    return this.http.get<ILastTrade>(this.apiUrl + '/tse/stock_last_trade/' + ins).pipe(
      take(1)
    );
  }

  getStockMazanneh(ins: string) {
    return this.http.get<IMazanneh[]>(this.apiUrl + '/tse/stock_limits/' + ins).pipe(
      tap(res => {
        this.mazannehMaxSupplyVolume = res[0].supplyVolume;
        this.mazannehMaxDemandVolume = res[0].demandVolume;

        res.forEach(item => {
          if (item.supplyVolume > this.mazannehMaxSupplyVolume)
            this.mazannehMaxSupplyVolume = item.supplyVolume;
          if (item.demandVolume > this.mazannehMaxDemandVolume)
            this.mazannehMaxDemandVolume = item.demandVolume;
        })
      })
    );
  }

  getMazannehMaxSupplyVolume() {
    return this.mazannehMaxSupplyVolume;
  }

  getMazannehMaxDemandVolume() {
    return this.mazannehMaxDemandVolume;
  }

  getChartInfo(ins: string) {
    return this.http.get<IChart[]>(this.apiUrl + '/tse/stock_chart_data/' + ins);
  }

}
