import {
  Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, ViewChild,
  AfterViewInit, OnChanges
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Test} from '../Test';

@Component({
  selector: 'app-test-editor',
  templateUrl: './testeditor.component.html',
  styleUrls: ['./testeditor.component.sass']
})

export class TestEditorComponent implements OnChanges{
  @Input() model: Test;
  @Output() onSubmit = new EventEmitter();

  // @ViewChild('editTestForm') form;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: any) {

    this.doSomething(changes);

  }

  submit() {
    this.onSubmit.emit(this.model);
  }

  doSomething(values) {
    console.log('Values: ', values);
  }
}
