import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultStore } from '../../shared/result.store';

import * as q from 'Q';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['results.component.sass']
})

export class ResultsComponent implements OnInit {
  results: any;
  result: any;

  constructor(private resultStore: ResultStore, private cdr: ChangeDetectorRef) {
    this.results = [];
    this.result = null;
  }

  ngOnInit() {
    this.resultStore.get().then((value) => {
      this.results = value;
      this.cdr.detectChanges();
    });
  }

  selectResult(report) {
    this.result = report;
    this.cdr.detectChanges();
  }

  ignoreResultRun(ignorePoint) {
    console.log('Ignore result');
    this.resultStore.toggleIgnoreEntry(ignorePoint.result, ignorePoint.data).then((value) => {
      this.resultStore.get().then((results) => {
        this.results = results;
        this.cdr.detectChanges();

        return q.when(this.results.filter((item) => {
          return item.id === ignorePoint.result.id;
        })[0]);
      }).then((res) => {
        this.result = res;
        this.cdr.detectChanges();
      });
    });
  }
}
