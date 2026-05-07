import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlantComponent } from './delete-plant.component';

describe('DeletePlantComponent', () => {
  let component: DeletePlantComponent;
  let fixture: ComponentFixture<DeletePlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePlantComponent]
    });
    fixture = TestBed.createComponent(DeletePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
