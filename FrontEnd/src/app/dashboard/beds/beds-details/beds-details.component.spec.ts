import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsDetailsComponent } from './beds-details.component';

describe('BedsDetailsComponent', () => {
  let component: BedsDetailsComponent;
  let fixture: ComponentFixture<BedsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
