import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Test} from '../Test';

@Component({
  selector: 'app-test-form',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.sass']
})

export class TestFormComponent {
  // model = new Test('http://google.com', 1, false);
  @Output() onSubmit = new EventEmitter();
  @Input() model: Test;
  @Input() name: string;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  submit() {
    this.onSubmit.emit(this.model);
  }
}
