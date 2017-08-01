import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.sass']
})

export class TestListComponent implements OnInit {
  selectedTests: string[] = [];
  testOptions: any = [];
  @Input() tests: Subject<any>;
  @Input() selected;
  @Output() onSelect = new EventEmitter();
  @Output() onSelectedTests = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tests.subscribe((value) => {
      console.log('TEST LIST: ', value);
      this.testOptions = value;
      this.selectedTests = [];
      this.onSelectedTests.emit(this.selectedTests);
      this.cdr.detectChanges();
    });
  }

  // ngOnChanges(values) {
  //   console.log('Values: ', values);
  //   if (values.selected) {
  //     this.modifySelected(values.selected.currentValue);
  //   }
  // }

  update() {
    this.cdr.detectChanges();
    console.log('Selected from list: ', this.selectedTests);
    this.onSelectedTests.emit(this.selectedTests);
  }

  // private modifySelected(changedTests) {
  //   if (changedTests.length === 0) {
  //     this.selectedTests = [];
  //   }
  //   this.cdr.detectChanges();
  // }
}
