import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlGenericDialogSample2Component} from './bl-generic-dialog-sample-2.component';

describe('BlGenericDialogSample2Component', () => {
    let component: BlGenericDialogSample2Component;
    let fixture: ComponentFixture<BlGenericDialogSample2Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlGenericDialogSample2Component],
        }).compileComponents();

        fixture = TestBed.createComponent(BlGenericDialogSample2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
