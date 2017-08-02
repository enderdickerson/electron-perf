import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-count',
  templateUrl: './testcount.component.html',
  styleUrls: ['/testcount.component.sass']
})

export class TestCountComponent {
  @Input() count;
}
