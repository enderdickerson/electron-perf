import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges} from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.sass']
})

export class TestListComponent implements OnChanges {
  selectedTests: string[] = [];
  @Input() tests;
  @Input() selected;
  @Output() onSelect = new EventEmitter();
  @Output() onSelectedTests = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(values) {
    console.log('Values: ', values);
    if (values.selected) {
      this.modifySelected(values.selected.currentValue);
    }
  }

  update() {
    this.cdr.detectChanges();
    console.log('Selected from list: ', this.selectedTests);
    this.onSelectedTests.emit(this.selectedTests);
  }

  private modifySelected(changedTests) {
    console.log('Changed tests: ', changedTests);

    if (changedTests.length === 0) {
      this.selectedTests = [];
    }

    // this.selectedTests = this.selectedTests.filter((item) => {
    //   return changedTests.indexOf(item) > -1;
    // });
    this.cdr.detectChanges();
  }

  // private modifySelected(changedTests) {
  //   this.selectedTests = this.selectedTests.filter((item) => {
  //     return changedTests.indexOf(item) > -1;
  //   });
  //   this.cdr.detectChanges();
  // }
}
