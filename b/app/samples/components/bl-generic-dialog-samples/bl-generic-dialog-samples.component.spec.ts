import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlGenericDialogSamplesComponent } from './bl-generic-dialog-samples.component';

describe('BlGenericDialogSamplesComponent', () => {
  let component: BlGenericDialogSamplesComponent;
  let fixture: ComponentFixture<BlGenericDialogSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlGenericDialogSamplesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlGenericDialogSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
