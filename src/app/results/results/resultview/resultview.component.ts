import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnDestroy} from '@angular/core';

const moment = window.require('moment');
const colors = window.require('nice-color-palettes');

@Component({
  selector: 'app-result-view',
  templateUrl: './resultview.component.html',
  styleUrls: ['resultview.component.sass']
})

export class ResultViewComponent implements OnChanges, OnDestroy {
  data: any;
  options: any;

  @Input() result: any;
  @Output() onIgnore = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.data = this.getData();
    this.options = {
      fill: false,
      scales: {
        xAxes: [
          {display: false}
        ]
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            console.log('item: ', item, data);
            return item.yLabel.toFixed(2) + 's ' + moment(item.xLabel).fromNow();
          }
        }
      },
    };
  }

  ngOnDestroy() {
    this.cdr.detach();
  }

  asTime(runTime) {
    return moment(runTime).format('HH:MM:SS MM/DD/YYYY');
  }

  fromTime(runTime) {
    return moment(runTime).fromNow();
  }

  selectData(point) {
    const data = this.data.datasets[point.element._datasetIndex].data[point.element._index].id;

    console.log('Point selected: ', point);
    this.onIgnore.emit({result: this.result, data: data});
  }

  ignoreResult(run) {
    console.log('Ignoring result');
    this.onIgnore.emit({result:this.result, data: run.id});
  }

  getData() {
    if (!this.result || !this.result.results.length) {
      return;
    }

    const colorSet = colors[0].concat(colors[1]);

    const filtered = this.result.results.filter((result) => {
      return result.ignore !== true;
    });

    const environments = filtered.map((item) => {
      return item.host;
    }).filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

    const groupedByHost = Array.from({length: environments.length}, i => []);

    filtered.forEach((item) => {
      const index = environments.indexOf(item.host);

      groupedByHost[index].push(item);
    });

    const asScatterPoints = [];

    groupedByHost.forEach((item, index) => {
      asScatterPoints.push({
        label: item[0].host,
        fill: false,
        // lineTension: 0,
        cubicInterpolationMode: 'monotone',
        borderColor: colorSet[index],
        data: item.map((res) => {
          return {
            x: moment(res.endTime),
            y: parseFloat(res.elapsed),
            id: res.id
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
