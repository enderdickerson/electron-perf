import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-view',
  templateUrl: './resultview.component.html',
  styleUrls: ['resultview.component.sass']
})

export class ResultViewComponent {
  @Input() result: any;
}
