import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.sass']
})

export class TestListComponent implements OnInit, OnDestroy {
  selectedTests: string[] = [];
  testOptions: any = [];
  filteredTests: any = [];
  searchVal;
  openTest;

  @Input() tests: Subject<any>;
  @Input() selected;
  @Output() onSelect = new EventEmitter();
  @Output() onSelectedTests = new EventEmitter();

  filteredTestWatcher: Subject<string> = new Subject<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tests.subscribe((value) => {
      this.testOptions = value.map((item) => {
        const url = new URL(item.url);

        return Object.assign(item, {
          path: url.pathname,
          queryString: url.searchParams,
          hostname: url.hostname
        });
      }).sort((a, b) => {
        return b.path > a.path ? -1 : b.path < a.path ? 1 : 0;
      });

      this.selectedTests = [];

      if (this.searchVal) {
        this.filter(this.searchVal);
      } else {
        this.copyItems();
      }

      this.onSelectedTests.emit(this.selectedTests);
      this.cdr.detectChanges();
    });

    this.filteredTestWatcher
      .debounceTime(300)
      .subscribe((model) => {
        this.filterItem(model);
      });
  }

  ngOnDestroy() {
    this.cdr.detach();
    this.filteredTestWatcher.unsubscribe();
  }

  filter(value) {
    this.filteredTestWatcher.next(value);
  }

  copyItems() {
    this.filteredTests = Object.assign([], this.testOptions);
  }

  filterItem(value) {
    if (!value) {
      this.copyItems();
    }

    this.filteredTests = [];
    this.cdr.detectChanges();
    this.filteredTests = Object.assign([], this.testOptions)
      .filter(item => item.url.toLowerCase().indexOf(value.toLowerCase()) > -1);
    this.cdr.detectChanges();
  }

  update() {
    this.cdr.detectChanges();
    this.onSelectedTests.emit(this.selectedTests);
  }

  onSelectTest(test) {
    this.onSelect.emit(test);
    this.openTest = test.id;
    this.cdr.detectChanges();
  }
}
