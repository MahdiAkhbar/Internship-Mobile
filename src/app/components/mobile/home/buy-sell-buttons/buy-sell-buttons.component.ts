import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../bottom-sheet/bottom-sheet.component';
import { OrderService } from '../../../..//shared/services/order.service';

@Component({
  selector: 'app-buy-sell-buttons',
  templateUrl: './buy-sell-buttons.component.html',
  styleUrl: './buy-sell-buttons.component.css'
})
export class BuySellButtonsComponent {
  constructor(private _bottomSheet: MatBottomSheet, private orderService: OrderService) { }

  async openBottomSheet(val: string) {
    await this.orderService.setOrderType(val);
    this._bottomSheet.open(BottomSheetComponent);
  }

}
