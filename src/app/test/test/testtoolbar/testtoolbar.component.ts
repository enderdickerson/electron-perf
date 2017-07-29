import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-test-toolbar',
  templateUrl: './testtoolbar.component.html',
  styleUrls: ['./testtoolbar.component.sass']
})

export class TestToolbarComponent implements OnInit {
  address: string;
  hasPendingTests: boolean;
  @Output() onRun = new EventEmitter();
  @Input() pending: Subject<boolean>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.hasPendingTests = false;

    this.cdr.detectChanges();

    this.pending.subscribe((value) => {
      this.hasPendingTests = value;
      console.log('value changed again: ', value);
      this.cdr.detectChanges();
    });
  }

  run() {
    this.onRun.emit(this.address);
  }
}
