import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IWatchlist } from '../interfaces/watchList';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  username!: string;

  addWatchList: Subject<IWatchlist> = new Subject();
  removeWatchListSubject: Subject<IWatchlist> = new Subject();

  getWatchList(username: string) {
    this.username = username;
    return this.http.get<IWatchlist[]>(this.apiUrl + '/favorite/' + username);
  }

  addToWatchList(item: IWatchlist) {
    let data = {
      username: this.username,
      insCode: item.insCode
    };
    return this.http.post(this.apiUrl + '/favorite/add_to_user', data);
  }

  removeWatchlistItem(ins: string) {
    let data = {
      username: this.username,
      insCode: ins
    };
    return this.http.delete(this.apiUrl + '/favorite/delete_from_user', { body: data });
  }
}
