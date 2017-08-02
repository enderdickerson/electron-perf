import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultStore } from '../../shared/result.store';

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
    this.resultStore.ignoreEntry(ignorePoint.result, ignorePoint.data).then((value) => {
      this.resultStore.get().then((results) => {
        this.results = results;
        this.cdr.detectChanges();
      }).then(() => {
        this.result = value;
        this.cdr.detectChanges();
      });
    });
  }
}
