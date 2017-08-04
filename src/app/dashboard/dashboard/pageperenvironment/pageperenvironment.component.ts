import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-per-environment',
  templateUrl: './pageperenvironment.component.html',
  styleUrls: ['/pageperenvironment.component.sass']
})

export class PagePerEnvironmentComponent implements OnInit, OnDestroy {
  options;
  title: string;
  chartTypeRef: string;

  @Input() data;
  @Output() changeChart = new EventEmitter();
  @Output() chartPointClicked = new EventEmitter();

  @Input() chartType: Subject<string>;
  @Input() chartTitle: Subject<string>;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  selectData(point) {
    const data = this.data.datasets[point.element._datasetIndex].data[point.element._index].id;

    console.log('Point selected: ', point);

    // this.router.navigate(['results', point.data.name]);

    this.chartPointClicked.emit(point.element._model);

    // this.onIgnore.emit({result: this.result, data: data});
  }

  ngOnDestroy() {
    this.cdr.detach();
    this.chartType.unsubscribe();
    this.chartTitle.unsubscribe();
  }

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
