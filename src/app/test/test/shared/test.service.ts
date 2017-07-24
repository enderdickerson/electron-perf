import { Injectable } from '@angular/core';
import * as path from 'path';
import * as url from 'url';
import * as childProcess from 'child_process';

@Injectable()

export class TestService {
  constructor() {
  }

  runTest(url) {
    if (!url) {
      throw new Error('No url specified for testing.');
    }

    let fork = childProcess.fork(__dirname);

    fork.on('message', (result) => {
      console.log('result: ', result);
    });

    fork.send(fib(45));
  }
}

function fib(n) {
   if (n === 0) {
     return 0;
   } else if (n === 1) {
     return 1;
   } else {
     return fib(n-1) + fib(n-2);
   }
}
