import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-test-toolbar',
  templateUrl: './testtoolbar.component.html',
  styleUrls: ['./testtoolbar.component.sass']
})

export class TestToolbarComponent implements OnInit {
  hasPendingTests: boolean;
  env: string;
  envs: any;
  @Output() onRun = new EventEmitter();
  @Output() onRunSelected = new EventEmitter();
  @Output() onRunEnv = new EventEmitter();
  @Input() pending: Subject<boolean>;
  @Input() selectedTests: string[] = [];
  @Input() environments: Subject<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.hasPendingTests = false;

    this.cdr.detectChanges();

    this.pending.subscribe((value) => {
      this.hasPendingTests = value;
      console.log('value changed again: ', value);
      this.cdr.detectChanges();
    });

    this.environments.subscribe((value) => {
      this.envs = value;
      console.log('Envs changed', value);
      this.cdr.detectChanges();
    });
  }

  run() {
    this.onRun.emit();
  }

  runSelected() {
    this.onRunSelected.emit();
  }

  runEnv() {
    this.onRunEnv.emit(this.env);
  }
}
