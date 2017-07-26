import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'sitenav',
  templateUrl: './sitenav.component.html',
  styleUrls: ['sitenav.component.sass']
})

export class SiteNavComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Dashboard', icon: 'fa-bar-chart', routerLink: ['/dashboard']},
          {label: 'Pages', icon: 'fa-calendar', routerLink: ['/pages']},
          {label: 'Test', icon: 'fa-book', routerLink: ['/test']}
      ];
  }
}
