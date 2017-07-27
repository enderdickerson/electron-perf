import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './resultlist.component.html',
  styleUrls: ['resultlist.component.sass']
})

export class ResultListComponent {
  @Input() results: any;
  @Output() onClick = new EventEmitter();
}
