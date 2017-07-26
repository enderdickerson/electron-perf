import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'web-address',
  templateUrl: './web-address.component.html',
  styleUrls: ['./web-address.component.sass']
})

export class WebAddressComponent {
  address: string;
  @Output() onRun = new EventEmitter();

  run() {
    this.onRun.emit(this.address);
  }
}
