import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRequestGenerateCodeDialogComponent } from './mat-request-generate-code-dialog.component';

describe('MatRequestGenerateCodeDialogComponent', () => {
  let component: MatRequestGenerateCodeDialogComponent;
  let fixture: ComponentFixture<MatRequestGenerateCodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatRequestGenerateCodeDialogComponent]
    });
    fixture = TestBed.createComponent(MatRequestGenerateCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
