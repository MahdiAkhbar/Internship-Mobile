import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSectionComponent } from './change-password-section.component';

describe('ChangePasswordSectionComponent', () => {
  let component: ChangePasswordSectionComponent;
  let fixture: ComponentFixture<ChangePasswordSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePasswordSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
