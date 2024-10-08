import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCodeValidateComponent } from './mat-code-validate.component';

describe('MatCodeValidateComponent', () => {
  let component: MatCodeValidateComponent;
  let fixture: ComponentFixture<MatCodeValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCodeValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCodeValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
