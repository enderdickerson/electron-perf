import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TestService } from '../../shared/test.service';
import { TestStore } from '../../shared/test.store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { Test } from './Test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})

export class TestComponent implements OnInit {
  tests: any;
  selectedTest: any;
  selectedTests: string[] = [];
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

  onRun() {
    this.testService.runTest();
  }

  onRunSelected() {
    console.log('Tests to run before match: ', this.selectedTests);
    const testsToRun = this.getSelectedFromIds(this.selectedTests);

    console.log('Tests to run: ', testsToRun);
    console.log('Total count: ', testsToRun.length);

    // this.testService.runTest();
  }

  private getSelectedFromIds(ids: string[]) {
    return this.tests.filter((item) => {
      return ids.indexOf(item.id) > -1;
    });
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
    const asTest = new Test('', 3, true);
    asTest.id = test.id;
    asTest.isAngular = test.isAngular;
    asTest.runs = test.runs;
    asTest.url = test.url;

    this.selectedTest = asTest;
    this.cdr.detectChanges();
  }

  handleSelected(tests) {
    console.log('Received ', tests);
    this.selectedTests = tests;
    this.cdr.detectChanges();
  }

  updateTest(test) {
    console.log('Update test: ', test);
  }
}
