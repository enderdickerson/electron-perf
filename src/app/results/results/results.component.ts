import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultService } from '../../shared/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['results.component.sass']
})

export class ResultsComponent implements OnInit {
  results: any;
  result: any;

  constructor(private resultService: ResultService, private cdr: ChangeDetectorRef) {
    this.results = [];
    this.result = null;
  }

  ngOnInit() {
    this.resultService.get().then((value) => {
      this.results = value;
      this.cdr.detectChanges();
    });
  }

  selectResult(report) {
    this.result = report;
    this.cdr.detectChanges();
  }
}
