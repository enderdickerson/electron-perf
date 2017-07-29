import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-test-editor',
  templateUrl: './testeditor.component.html',
  styleUrls: ['./testeditor.component.sass']
})

export class TestEditorComponent {
  @Output() onSubmit = new EventEmitter();
  @Input() test;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}
}
