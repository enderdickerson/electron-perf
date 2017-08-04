import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-test-toolbar',
  templateUrl: './testtoolbar.component.html',
  styleUrls: ['./testtoolbar.component.sass']
})

export class TestToolbarComponent implements OnInit, OnDestroy {
  hasPendingTests: boolean;
  env: string;
  envs: any;

  @Output() onRun = new EventEmitter();
  @Output() onRunSelected = new EventEmitter();
  @Output() onRunEnv = new EventEmitter();

  @Input() pending: Subject<boolean>;
  @Input() environments: Subject<any>;
  @Input() selectedTests: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.cdr.detach();
    this.pending.unsubscribe();
    this.environments.unsubscribe();
  }

  ngOnInit() {
    this.hasPendingTests = false;

    this.cdr.detectChanges();

    this.pending.subscribe((value) => {
      this.hasPendingTests = value;
      this.cdr.detectChanges();
    });

    this.environments.subscribe((value) => {
      this.envs = value;
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
