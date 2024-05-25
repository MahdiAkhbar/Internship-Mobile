import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazannehComponent } from './mazanneh.component';

describe('MazannehComponent', () => {
  let component: MazannehComponent;
  let fixture: ComponentFixture<MazannehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazannehComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MazannehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
