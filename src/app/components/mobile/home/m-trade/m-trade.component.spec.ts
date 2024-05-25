import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTradeComponent } from './m-trade.component';

describe('MTradeComponent', () => {
  let component: MTradeComponent;
  let fixture: ComponentFixture<MTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MTradeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
