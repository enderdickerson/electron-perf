import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';

const moment = window.require('moment');
const colors = window.require('nice-color-palettes');

@Component({
  selector: 'app-result-view',
  templateUrl: './resultview.component.html',
  styleUrls: ['resultview.component.sass']
})

export class ResultViewComponent implements OnChanges {
  data: any;
  @Input() result: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.getData();

    const colorSet = colors[0].concat(colors[1]);

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: colorSet[0]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: colorSet[1]
        }
      ]
    };
  }

  getData() {
    if (!this.result || !this.result.results.length) {
      return;
    }

    // const times = this.result.results.map((item) => {
    //   return item.endTime;
    // });
    //
    // times.sort((a, b) => {
    //   return b - a;
    // });
    //
    // const labels = times.map((item) => {
    //   return moment(item).format('HH:mm DD/MM');
    // });
    //
    // // const data = {
    // //   labels: labels,
    // //   datasets: this.result.results
    // // }
    //
    // moment(times[0]).week();
    //
    // console.log('earliestDate', earliestDate);
  }
}
