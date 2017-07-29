import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Test} from "./Test";

@Component({
  selector: 'app-new-test-form',
  templateUrl: './newtestform.component.html',
  styleUrls: ['./newtestform.component.sass']
})

export class NewTestFormComponent {
  submitted = false;
  model = new Test('http://google.com', 1, false);
  @Output() onSubmit = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  submit() {
    this.submitted = true;
    this.onSubmit.emit(this.model);
  }
}
