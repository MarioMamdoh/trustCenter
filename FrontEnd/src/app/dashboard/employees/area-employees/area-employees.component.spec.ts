import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEmployeesComponent } from './area-employees.component';

describe('AreaEmployeesComponent', () => {
  let component: AreaEmployeesComponent;
  let fixture: ComponentFixture<AreaEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
