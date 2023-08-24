import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsellingitemsComponent } from './topsellingitems.component';

describe('TopsellingitemsComponent', () => {
  let component: TopsellingitemsComponent;
  let fixture: ComponentFixture<TopsellingitemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopsellingitemsComponent]
    });
    fixture = TestBed.createComponent(TopsellingitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
