import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable()

export class TestService {
  constructor(private winService: WindowService) {
  }

  runTest(url) {
    if (!url) {
      throw new Error('No url specified for testing.');
    }

    let fork = this.winService.nativeWindow.child_process.fork('./src/background/runtest.js');

    fork.on('message', (result) => {
      console.log('result: ', result);
    });

    fork.send(url);
  }
}
