import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultStore } from '../../shared/result.store';
import {TestStore} from "../../shared/test.store";
import {Subject} from "rxjs/Subject";
const moment = window.require('moment');
const colors = window.require('nice-color-palettes');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
  currentChart: string;
  lastRunDate: any;
  results: [any];
  chart: any;
  testCount: any;
  chartType: Subject<string> = new Subject<string>();
  chartTitle: Subject<string> = new Subject<string>();

  constructor(private resultStore: ResultStore,
              private testStore: TestStore,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resultStore.get().then((results: [any]) => {
      if (results.length > 0) {
        this.results = results;
      }
    }).then(() => {
      this.getRunDate();
      this.getEnvironmentTiming();
    });

    this.testStore.getCount().then((count) => {
      this.testCount = count;
      console.log('Count: ', count);
    });

    this.chartType.next('bar');
    this.chartTitle.next('Page Speed Per Environment');
    this.currentChart = 'environment';
  }

  private getRunDate() {
    const runDate = this.results.map((item) => {
      return item.results;
    }).reduce((arr, item) => {
      arr = arr.concat(item);
      return arr;
    }, []);

    runDate.sort((a, b) => {
      const endA = a.endTime;
      const endB = b.endTime;

      return endB - endA;
    });

    if (runDate.length === 0) {
      this.lastRunDate = undefined;
    } else {
      this.lastRunDate = {
        date: moment(runDate[0].endTime).format('MM/DD/YY'),
        time: moment(runDate[0].endTime).format('HH:MM')
      };
    }

    this.cdr.detectChanges();
  }

  private getEnvironmentTiming() {
    // const timings = this.results.map((item) => {
    //   return item.results.map((result) => {
    //     result.path = item.name;
    //   });
    // }).reduce((arr, item) => {
    //   arr = arr.concat(item);
    //   return arr;
    // }, []);
    //
    // const withHost = timings.reduce((arr, item) => {
    //   if (arr[item.host])
    // }, {});

    /*
      [{ label: HOST,
        data: [AVERAGE, AVERAGE, AVERAGE] - Zero where does not apply
      }]

     */

    const reportNames = this.results.map((item) => {
      return item.name;
    });

    const resultArrays = this.results.map((report) => {
      return report.results;
    });

    const resultsFlat = resultArrays.reduce((arr, item) => {
      arr = arr.concat(item);
      return arr;
    }, []);

    const environments = resultsFlat.map((item) => {
      return item.host;
    }).filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

    const colorSet = colors[0].concat(colors[1]).concat(colors[2]);

    const dataSets = environments.map((item, envIndex) => {
      return {
        label: item,
        backgroundColor: colorSet[envIndex],
        data: this.results
          .reduce((arr, report, index) => {
            const relevant = report.results.filter((result) => {
              return result.host === item;
            });

            relevant.sort((a, b) => {
              return b.endTime - a.endTime;
            });

            if (relevant.length) {
              const recent = relevant[0];

              const lastSampleDate = moment(recent.endTime).subtract(1, 'hours');

              const sameHour = relevant.filter((result) => {
                return moment(result.endTime).isAfter(lastSampleDate);
              });

              arr[index] = (sameHour.reduce((avg, res) => {
                return avg + isNaN(res.elapsed) ? 0 : parseFloat(res.elapsed);
              }, 0) / sameHour.length).toFixed(2);
            } else {
              arr[index] = 0;
            }

            return arr;
          }, Array(reportNames.length).fill(0))
      };
    });

    const graph = {
      labels: reportNames,
      datasets: dataSets
    };

    console.log('Graph obj', dataSets);

    this.chart = graph;

    this.cdr.detectChanges();
  }

  getHeatMap() {
    const colorSet = colors[0].concat(colors[1]).concat(colors[2]);

    const graph = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: colorSet
        }
      ]
    };

    this.chart = graph;
    this.cdr.detectChanges();
  }

  handleChartChange(chart) {
    if (chart === this.currentChart) {
      return;
    }

    switch (chart) {
      case 'environment':
        this.currentChart = 'environment';
        this.chartType.next('bar');
        this.chartTitle.next('Page Speed Per Environment');
        this.getEnvironmentTiming();
        break;
      case 'heatmap':
        this.currentChart = 'heatmap';
        this.chartType.next('doughnut');
        this.chartTitle.next('Slowest Pages Heatmap');
        this.getHeatMap();
        break;
    }
  }
}
