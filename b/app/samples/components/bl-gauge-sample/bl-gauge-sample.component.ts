import { Component, OnInit } from '@angular/core';
import { GaugeLabel, GaugeSegment } from '@esedit-md/shared-ui';

@Component({
  selector: 'bl-gauge-sample',
  templateUrl: './bl-gauge-sample.component.html',
})
export class BlGaugeSampleComponent implements OnInit {
  public segments: GaugeSegment[] = [];
  public labels: GaugeLabel[] = [];

  public ngOnInit(): void {
    const presencePercent = 72;
    this.segments = [];
    this.segments.push(
      new GaugeSegment({
        value: presencePercent,
        color: '#0277bd',
        borderWidth: 15,
      })
    );
    this.labels.push(
      new GaugeLabel({
        color: '#000',
        text: Math.floor(presencePercent) + '%',
        x: 0,
        y: 18,
        fontSize: '3em',
      })
    );
  }
}
