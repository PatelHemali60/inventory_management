import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginantionComponent } from './paginantion.component';

describe('PaginantionComponent', () => {
  let component: PaginantionComponent;
  let fixture: ComponentFixture<PaginantionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginantionComponent]
    });
    fixture = TestBed.createComponent(PaginantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
