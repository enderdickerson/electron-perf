import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-percentage-change-graph',
  templateUrl: './percentagechangegraph.component.html',
  styleUrls: ['percentagechangegraph.component.sass']
})

export class PercentageChangeGraphComponent{
  @Input() data;
}
