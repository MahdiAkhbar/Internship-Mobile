import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoyComponent } from './portfoy.component';

describe('PortfoyComponent', () => {
  let component: PortfoyComponent;
  let fixture: ComponentFixture<PortfoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfoyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
