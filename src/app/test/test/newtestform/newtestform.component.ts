import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Test} from '../Test';

@Component({
  selector: 'app-new-test-form',
  templateUrl: './newtestform.component.html',
  styleUrls: ['./newtestform.component.sass']
})

export class NewTestFormComponent {
  model: Test;
  newTestForm;
  @Output() onSubmit = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.clear();
  }

  private clear() {
    this.model = new Test('', 3, true);
  }

  submit() {
    this.onSubmit.emit(this.model);
    this.clear();
    // this.newTestForm.reset();
    // this.newTestForm.resetForm();
    this.cdr.detectChanges();
  }
}
