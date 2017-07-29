import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultStore } from '../../shared/result.store';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
  lastRunDate: any;
  results: [any];

  constructor(private resultStore: ResultStore, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resultStore.get().then((results: [any]) => {
      if (results.length > 0) {
        this.results = results;
      }
    }).then(() => {
      this.getRunDate();
      this.getEnvironmentTiming();
    });
  }

  private getRunDate() {
    const runDate = this.results[0].results[0].endTime;

    this.lastRunDate = {
      date: moment(runDate).format('MM/DD/YY'),
      time: moment(runDate).format('HH:MM')
    };

    this.cdr.detectChanges();
  }

  private getEnvironmentTiming() {
    let timings = this.results.reduce((all, item) => {
      return all.concat(item.results);
    });
  }
}
