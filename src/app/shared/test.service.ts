import { Injectable } from '@angular/core';

import { WindowService } from './window.service';

@Injectable()

export class TestService {
  constructor(private winService: WindowService) {
  }

  runTest() {
    const fork = this.winService.nativeWindow.child_process.fork('./src/background/runtest.js');

    fork.on('message', (result) => {
      console.log('result: ', result);
    });

    fork.send('go');
  }
}
