import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplantComponent } from './addplant.component';

describe('AddplantComponent', () => {
  let component: AddplantComponent;
  let fixture: ComponentFixture<AddplantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddplantComponent]
    });
    fixture = TestBed.createComponent(AddplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
