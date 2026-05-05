import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesShComponent } from './services-sh.component';

describe('ServicesShComponent', () => {
  let component: ServicesShComponent;
  let fixture: ComponentFixture<ServicesShComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesShComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesShComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
