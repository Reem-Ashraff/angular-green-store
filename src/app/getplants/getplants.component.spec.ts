import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetplantsComponent } from './getplants.component';

describe('GetplantsComponent', () => {
  let component: GetplantsComponent;
  let fixture: ComponentFixture<GetplantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetplantsComponent]
    });
    fixture = TestBed.createComponent(GetplantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
