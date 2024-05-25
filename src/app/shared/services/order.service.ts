import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  orderType!: string;

  setOrderType(val: string) {
    this.orderType = val;
  }

  getOrderType() {
    return this.orderType;
  }
}
