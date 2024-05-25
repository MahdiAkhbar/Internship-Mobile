import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { StockService } from '../../../../shared/services/stock.service';
import { WatchListService } from '../../../../shared/services/watch-list.service';
import { ISearch } from '../../../../shared/interfaces/search.interface';
import { IStock } from '../../../../shared/interfaces/stock-info.interface';
import { concatMap, distinctUntilChanged, filter, fromEvent, interval, map, mergeMap, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  constructor(
    private stockService: StockService,
    private r2: Renderer2,
    private watchListService: WatchListService
  ) { }

  searchResultList!: ISearch[];
  searchResultListVisiblity: boolean = false;
  isFocus: boolean = false;
  selectedStock: IStock = {
    insCode: '',
    symbol: '',
    companyName: '',
    symbolEn: '',
    companyNameEn: '',
    maxAllowedPrice: 0,
    minAllowedPrice: 0,
    baseVolume: 0,
    flow: 0,
    valid: 0,
    symbolType: 0,
    symbolAsset: 0,
    finalTradePrice: 0,
    firstPrice: 0,
    closePrice: 0,
    tradesCount: 0,
    tradesVolume: 0,
    tradesValue: 0
  };

  @ViewChild('search', { static: true }) search!: ElementRef;

  ngOnInit(): void {
    this.stockService.insCode.pipe(
      distinctUntilChanged(),
      switchMap((ins) => interval(5 * 60 * 1000).pipe(
        startWith(0),
        mergeMap(() => this.stockService.getStockInfo(ins))
      ))
    ).subscribe(res => {
      this.selectedStock = res;
      this.r2.setProperty(this.search.nativeElement, 'value', res.symbol);
      this.search.nativeElement.focus();
    });


    fromEvent(this.search.nativeElement, 'input').pipe(
      map(event => event as InputEvent),
      map(input => (<HTMLInputElement>input.target).value),
      tap(i => {
        if (i.length < 1) {
          this.searchResultList = [];
          this.searchResultListVisiblity = false;
        }
      }),
      filter(input => input.length > 1),
      concatMap(input => this.stockService.search(input))
    ).subscribe(res => {
      this.searchResultList = res;
      this.searchResultListVisiblity = true;
      this.isFocus = true;
    })

    this.r2.listen(this.search.nativeElement, 'focus', () => {
      this.isFocus = true;
    });
    this.r2.listen(this.search.nativeElement, 'focusout', () => {
      setTimeout(() => {
        this.isFocus = false;
      }, 50);
    });

  }

  onSelectSearchItem(val: ISearch) {
    this.stockService.insCode.next(val.insCode);
    this.stockService.setInsCode(val.insCode);
    this.searchResultListVisiblity = false;
    this.stockService.getStockInfo(val.insCode).subscribe(res => {
      this.selectedStock = res;
      this.r2.setProperty(this.search.nativeElement, 'value', val.symbol);
    });
  }

  onAddToWatchList() {
    this.watchListService.addToWatchList(this.selectedStock).subscribe()
    this.watchListService.addWatchList.next(this.selectedStock);
  }

}