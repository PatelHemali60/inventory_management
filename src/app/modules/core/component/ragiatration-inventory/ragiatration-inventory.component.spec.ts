import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RagiatrationInventoryComponent } from './ragiatration-inventory.component';

describe('RagiatrationInventoryComponent', () => {
  let component: RagiatrationInventoryComponent;
  let fixture: ComponentFixture<RagiatrationInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RagiatrationInventoryComponent]
    });
    fixture = TestBed.createComponent(RagiatrationInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
