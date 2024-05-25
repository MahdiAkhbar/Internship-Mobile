import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css'
})
export class BottomSheetComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet, private orderService: OrderService) { }

  orderType!: string;

  ngOnInit(): void {
    this.orderType = this.orderService.getOrderType();
  }

  formType(val: string) {
    this.orderType = val;
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

}
