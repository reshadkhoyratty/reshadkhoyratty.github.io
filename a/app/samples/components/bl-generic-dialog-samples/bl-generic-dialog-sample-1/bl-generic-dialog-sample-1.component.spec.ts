import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlGenericDialogSample1Component } from './bl-generic-dialog-sample-1.component';

describe('BlGenericDialogSample1Component', () => {
  let component: BlGenericDialogSample1Component;
  let fixture: ComponentFixture<BlGenericDialogSample1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlGenericDialogSample1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(BlGenericDialogSample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
