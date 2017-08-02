import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-page-per-environment',
  templateUrl: './pageperenvironment.component.html',
  styleUrls: ['/pageperenvironment.component.sass']
})

export class PagePerEnvironmentComponent implements OnInit {
  options;
  title: string;
  chartTypeRef: string;
  @Input() data;
  @Output() changeChart = new EventEmitter();
  @Input() chartType: Subject<string>;
  @Input() chartTitle: Subject<string>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartTypeRef = 'bar';
    this.title = 'Page Speed Per Environment';

    this.chartType.subscribe((value) => {
      this.chartTypeRef = value;
      this.cdr.detectChanges();
    });

    this.chartTitle.subscribe((value) => {
      this.title = value;
      this.cdr.detectChanges();
    });

    this.options = {
      scales: {
        xAxes: [
          {display: false}
        ]
      }
    };
  }
}
