import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';
type formPickers = {
  colorPicker1 : string|null;
  colorPicker2 : string|null;
  colorPicker3 : string|null;
  colorPicker4 : string|null;
  colorPicker5 : string|null;

}

@Component({
  selector: 'bl-color-picker-sample',
  templateUrl: './bl-color-picker-sample.component.html',
 })
export class BlColorPickerSampleComponent extends SampleAbstractComponent<formPickers> implements OnInit{


  color : string;
  colors : string[][]= [
    ["#f44336"], ["#e91e63"], ["#9c27b0"], ["#673ab7"],
    ["#3f51b5"], ["#2196f3"], ["#03a9f4"], ["#00bcd4"], ["#009688"],
    ["#4caf50"], ["#8bc34a"], ["#cddc39"], ["#ffeb3b"], ["#ffc107"], 
    ["#ff9800"]];

  public ngOnInit(): void {
    this.color = '#AFDEF1';
    this.formGroup = new FormGroup<any>({
      colorPicker1: new FormControl<string>(null),
      colorPicker2: new FormControl<string>(null),
      colorPicker3: new FormControl<string>('#000000'),
      colorPicker4: new FormControl<string>(null),
      colorPicker5: new FormControl<string>(null),
      });

  }
}
