import {Component, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.sass']
})

export class TestListComponent {
  selectedTests: string[] = [];
  @Input() tests;
  @Output() onSelect = new EventEmitter();
  @Output() onSelectedTests = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  update() {
    this.cdr.detectChanges();
    console.log('Selected from list: ', this.selectedTests);
    this.onSelectedTests.emit(this.selectedTests);
  }
}
