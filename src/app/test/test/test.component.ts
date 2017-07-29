import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TestService } from '../../shared/test.service';
import { TestStore } from '../../shared/test.store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})

export class TestComponent implements OnInit {
  tests: any;
  selectedTest: any;
  selectedTests: string[];
  runningTests: Subject<boolean> = new Subject<boolean>();

  constructor(
    private testService: TestService,
    private testStore: TestStore,
    private cdr: ChangeDetectorRef
  ) {
    this.testService.getPendingTests().subscribe((value) => {
      console.log('TestComponent: ', value);
      this.runningTests.next(value);
    });
    this.tests = [];
  }

  ngOnInit() {
    this.testStore.get().then((tests) => {
      this.tests = tests;
      this.cdr.detectChanges();
    });
  }

  onRun(url) {
    console.log('Run this url test: ' + url);
    this.testService.runTest();
  }

  handleSubmit(test) {
    this.testStore.save(test).then(() => {
      this.testStore.get().then((tests) => {
        this.tests = tests;
        console.log('Tests are now: ', this.tests);
        this.cdr.detectChanges();
      });
    });
  }

  handleSelect(test) {
    this.selectedTest = test;
    this.cdr.detectChanges();
  }

  handleSelected(tests) {
    this.selectedTests = tests;
    this.cdr.detectChanges();
  }
}
