import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlTextAreaSampleComponent } from './bl-text-area-sample.component';

describe('BlTextAreaSampleComponent', () => {
  let component: BlTextAreaSampleComponent;
  let fixture: ComponentFixture<BlTextAreaSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlTextAreaSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlTextAreaSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
