import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellButtonsComponent } from './buy-sell-buttons.component';

describe('BuySellButtonsComponent', () => {
  let component: BuySellButtonsComponent;
  let fixture: ComponentFixture<BuySellButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuySellButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuySellButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
