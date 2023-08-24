import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSatsticComponent } from './sales-satstic.component';

describe('SalesSatsticComponent', () => {
  let component: SalesSatsticComponent;
  let fixture: ComponentFixture<SalesSatsticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesSatsticComponent]
    });
    fixture = TestBed.createComponent(SalesSatsticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
