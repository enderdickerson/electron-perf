import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TestService } from '../../shared/test.service';
import { TestStore } from '../../shared/test.store';
import { Subject } from 'rxjs/Subject';

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
  environments: Subject<any> = new Subject<any>();
  testList: Subject<any> = new Subject<any>();

  constructor(
    private testService: TestService,
    private testStore: TestStore,
    private cdr: ChangeDetectorRef
  ) {
    this.testService.getPendingTests().subscribe((value) => {
      this.runningTests.next(value);
    });
    this.tests = [];
    this.testList.next([]);
  }

  ngOnInit() {
    this.testStore.get().then((tests) => {
      this.tests = tests;
      this.testList.next(tests);

      this.environments.next(this.getEnvs());

      this.cdr.detectChanges();
    });
  }

  private getEnvs() {
    const envs = this.tests.map((item) => {
      const url = new URL(item.url);

      return url.host;
    }).reduce((arr, item) => {
      if (arr.indexOf(item) === -1) {
        arr.push(item);
      }

      return arr;
    }, []).map((item) => {
      return {label: item, value: item};
    });

    envs.unshift({label: '', value: ''});

    return envs;
  }

  onRun() {
    this.testService.runTest(this.tests);
  }

  onRunSelected() {
    const testsToRun = this.getSelectedFromIds(this.selectedTests);

    this.testService.runTest(testsToRun);
  }

  onRunEnv(env) {
    const testsToRun = this.getSelectedFromEnv(env);

    this.testService.runTest(testsToRun);
  }

  private getSelectedFromEnv(env) {
    return this.tests.filter((item) => {
      const url = new URL(item.url);

      return env === url.host;
    });
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
        this.testList.next(tests);
        this.environments.next(this.getEnvs());
        this.cdr.detectChanges();
      });
    });
  }

  handleSelect(test) {
    this.selectedTest = undefined;
    this.cdr.detectChanges();
    this.selectedTest = test;
    this.cdr.detectChanges();
  }

  handleSelected(tests) {
    this.selectedTests = tests;
    this.cdr.detectChanges();
  }

  updateTest(test) {
    this.testStore.save(test).then(() => {
      this.testStore.get().then((tests) => {
        this.tests = tests;
        this.testList.next(tests);
        this.environments.next(this.getEnvs());
        this.cdr.detectChanges();
      });
    });
  }

  handleRemove(test) {
    this.testStore.remove(test).then(() => {
      this.testStore.get().then((tests) => {
        this.tests = tests;
        this.testList.next(tests);
        this.environments.next(this.getEnvs());
        this.selectedTest = undefined;
        this.selectedTests = [];
        this.cdr.detectChanges();
      });
    });
  }
}
