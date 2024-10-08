import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateDataComponent } from './form-update-data.component';

describe('FormUpdateDataComponent', () => {
  let component: FormUpdateDataComponent;
  let fixture: ComponentFixture<FormUpdateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
