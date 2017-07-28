import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TestService } from '../../shared/test.service';
import { TestStore } from '../../shared/test.store';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit{
  tests: any;

  constructor(
    private testService: TestService,
    private testStore: TestStore,
    private cdr: ChangeDetectorRef
  ) {}

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
}
