import { Component } from '@angular/core';
import { TestService } from './shared/test.service';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent {
  constructor(
    private testService: TestService
  ) {}

  onRun(url) {
    console.log('Run this url test: ' + url);
    this.testService.runTest(url);
  }
}
