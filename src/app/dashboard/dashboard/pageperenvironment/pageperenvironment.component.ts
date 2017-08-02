import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-per-environment',
  templateUrl: './pageperenvironment.component.html',
  styleUrls: ['/pageperenvironment.component.sass']
})

export class PagePerEnvironmentComponent {
  @Input() data;
}
