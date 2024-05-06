import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsDataComponent } from './us-data.component';

describe('UsDataComponent', () => {
  let component: UsDataComponent;
  let fixture: ComponentFixture<UsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsDataComponent]
    });
    fixture = TestBed.createComponent(UsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
