import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCustomerComponent } from './area-customer.component';

describe('AreaCustomerComponent', () => {
  let component: AreaCustomerComponent;
  let fixture: ComponentFixture<AreaCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
