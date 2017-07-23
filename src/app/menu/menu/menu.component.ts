import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuContainer implements OnInit {
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Dashboard', icon: 'fa-bar-chart', routerLink: ['/']},
          {label: 'Pages', icon: 'fa-calendar', routerLink: ['/pages']},
          {label: 'Test', icon: 'fa-book', routerLink: ['/test']}
      ];
  }
}
