import { Component } from '@angular/core';
import { ResultService } from '../shared/result.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.sass']
})

export class DashboardComponent {
  result: any;

  constructor(private resultService: ResultService) {
    resultService.get().then(function(results) {
      this.result = results;
    });
  }
}
