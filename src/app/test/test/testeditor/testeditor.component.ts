import {
  Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, ViewChild,
  AfterViewInit, OnChanges
} from '@angular/core';
import {Test} from '../Test';

@Component({
  selector: 'app-test-editor',
  templateUrl: './testeditor.component.html',
  styleUrls: ['./testeditor.component.sass']
})

export class TestEditorComponent implements OnChanges{
  @Input() model: Test;
  @Output() onSubmit = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: any) {
    console.log('changes: ', changes);
    this.cdr.detectChanges();
  }

  onChange() {
    this.cdr.detectChanges();
  }

  submit() {
    this.onSubmit.emit(this.model);
  }

  remove() {
    this.onRemove.emit(this.model);
  }
}
