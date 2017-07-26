import { Injectable } from '@angular/core';
import { WindowService } from '../../../shared/window.service';

@Injectable()

export class TestService {
  constructor(private winService: WindowService) {
  }

  runTest() {
    let fork = this.winService.nativeWindow.child_process.fork('./src/background/runtest.js');

    fork.on('message', (result) => {
      console.log('result: ', result);
    });

    fork.send('go');
  }
}
