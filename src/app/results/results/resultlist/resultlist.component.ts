import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result-list',
  templateUrl: './resultlist.component.html',
  styleUrls: ['resultlist.component.sass']
})

export class ResultListComponent {
  @Input() results: any;
  @Output() onClick = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {}

  goTo(id) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
