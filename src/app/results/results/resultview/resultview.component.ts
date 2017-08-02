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
  options: any;
  @Input() result: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // this.getData();



    // Datasets
    /*
      Create an array with length equal to
     */


    // this.data = {
    //   datasets: [{
    //     label: 'Scatter Dataset',
    //     data: [{
    //       x: -10,
    //       y: 0
    //     }, {
    //       x: 0,
    //       y: 10
    //     }, {
    //       x: 10,
    //       y: 5
    //     }]
    //   }]
    // };

    this.data = this.getData();

    // this.options = {
    //   scales: {
    //     xAxes: [
    //       {display: false}
    //     ]
    //   }
    // };
  }

  asTime(runTime) {
    return moment(runTime).format('HH:MM:SS MM/DD/YYYY');
  }

  fromTime(runTime) {
    return moment(runTime).fromNow();
  }

  ignoreResult(run) {
    console.log('Ignoring result');
  }

  getData() {
    if (!this.result || !this.result.results.length) {
      return;
    }

    const colorSet = colors[0].concat(colors[1]);

    const environments = this.result.results.map((item) => {
      return item.host;
    }).filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

    const groupedByHost = Array.from({length: environments.length}, i => []);

    this.result.results.forEach((item) => {
      const index = environments.indexOf(item.host);

      groupedByHost[index].push(item);
    });

    const asScatterPoints = [];

    groupedByHost.forEach((item, index) => {
      asScatterPoints.push({
        label: item[0].host,
        backgroundColor: colorSet[index],
        borderColor: colorSet[index],
        data: item.map((res) => {
          return {
            x: moment(res.endTime).format('DDDDHHMM'),
            y: parseFloat(res.elapsed)
          };
        })
      });
    });

    return {
      datasets: asScatterPoints
    };

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
