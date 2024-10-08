import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmAwardComponent } from './mat-confirm-award.component';

describe('MatConfirmAwardComponent', () => {
  let component: MatConfirmAwardComponent;
  let fixture: ComponentFixture<MatConfirmAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
