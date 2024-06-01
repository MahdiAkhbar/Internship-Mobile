import { Component, Inject, Input, OnInit } from '@angular/core';
import { IWatchlist } from '../../../../../shared/interfaces/watchList';
import { WatchListService } from '../../../../../shared/services/watch-list.service';
import { StockService } from '../../../../../shared/services/stock.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrl: './watchlist-item.component.css'
})
export class WatchlistItemComponent implements OnInit {
  constructor(
    private watchlistService: WatchListService,
    private stockService: StockService,
    // @Inject('API_URL') private apiUrl: string
  ) { }

  @Input('watchList') item!: IWatchlist;
  @Input('index') index!: number;

  changePercentage: {
    value: number,
    viewValue: string
  } = {
      value: 0,
      viewValue: '0'
    };

  ngOnInit(): void {
    this.stockService.getLastTrade(this.item.insCode).pipe(
      take(1)
    ).subscribe(res => {
      let value = (res.closePrice - res.priceYesterday) * 100 / res.priceYesterday;
      let viewValue = Math.abs(value).toFixed(2);
      this.changePercentage = {
        value: value,
        viewValue: viewValue
      }
    })
  }

  onWatchlistRemove(e: Event, item: IWatchlist) {
    e.stopPropagation();
    this.watchlistService.removeWatchlistItem(this.item.insCode).subscribe(() => {
      this.watchlistService.removeWatchListSubject.next(this.item);
    })

  }
}
