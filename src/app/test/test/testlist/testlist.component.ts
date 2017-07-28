import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.css']
})

export class TestListComponent {
  @Input() tests;
}
