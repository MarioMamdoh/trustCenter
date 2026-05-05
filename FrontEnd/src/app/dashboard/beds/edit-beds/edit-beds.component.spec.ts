import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBedsComponent } from './edit-beds.component';

describe('EditBedsComponent', () => {
  let component: EditBedsComponent;
  let fixture: ComponentFixture<EditBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
