import { Component } from '@angular/core';
import { IPortfoy } from '../../../../shared/interfaces/portfoy';

@Component({
  selector: 'app-portfoy',
  templateUrl: './portfoy.component.html',
  styleUrl: './portfoy.component.css'
})
export class PortfoyComponent {

  portfoy: IPortfoy[] = [
    {
      name: 'شپنا',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: 14,
      finishPrice: 6000,
      change: {
        value: 4.5,
        viewValue: 4.5
      },
      currentValue: 5600,
    },
    {
      name: 'ملت',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: -10,
      finishPrice: 6000,
      change: {
        value: 0,
        viewValue: 0
      },
      currentValue: 5600,
    },
    {
      name: 'پلاسک',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: 0,
      finishPrice: 6000,
      change: {
        value: 5,
        viewValue: 5
      },
      currentValue: 5600,
    },
    {
      name: 'شپنا',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: 14,
      finishPrice: 6000,
      change: {
        value: -4.5,
        viewValue: 4.5
      },
      currentValue: 5600,
    },
    {
      name: 'پلاسک',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: 0,
      finishPrice: 6000,
      change: {
        value: 5,
        viewValue: 5
      },
      currentValue: 5600,
    },
    {
      name: 'شپنا',
      count: 500,
      lastPrice: 6000,
      profitOrLoss: 14,
      finishPrice: 6000,
      change: {
        value: -4.5,
        viewValue: 4.5
      },
      currentValue: 5600,
    }
  ];

}
