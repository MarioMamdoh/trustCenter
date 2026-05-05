import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeesComponent } from './new-employees.component';

describe('NewEmployeesComponent', () => {
  let component: NewEmployeesComponent;
  let fixture: ComponentFixture<NewEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
