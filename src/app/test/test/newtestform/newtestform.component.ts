import {Component, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Test} from '../Test';

@Component({
  selector: 'app-new-test-form',
  templateUrl: './newtestform.component.html',
  styleUrls: ['./newtestform.component.sass']
})

export class NewTestFormComponent {
  model: Test;
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
    this.cdr.detectChanges();
  }
}
