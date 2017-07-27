import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-run-date',
  templateUrl: './rundate.component.html',
  styleUrls: ['rundate.component.sass']
})

export class RunDateComponent {
  @Input() lastRunDate;
}
