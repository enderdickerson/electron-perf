import { Injectable } from '@angular/core';

import { WindowService } from './window.service';

@Injectable()

export class TestService {
  constructor(private winService: WindowService) {
  }

  splitIntoGroups(original) {
    const MAX_THREADS = 4;

    let threads = MAX_THREADS;

    if (original.length < MAX_THREADS) {
      threads = original.length;
    }

    let start = [];

    for (let i = 0; i < MAX_THREADS; i++) {
      start.push([]);
    }

    return original.map((x) => {
       return [x];
    }).reduce((arr, item, index) => {
      const arrPoint = index % threads;

      arr[arrPoint] = arr[arrPoint].concat(item);

      return arr;
    }, start);
  }

  runTest() {
    const test = [
      {
        url: 'https://material.angularjs.org/latest/'
      },
      {
        url: 'https://material.angularjs.org/latest/getting-started'
      },
      {
        url: 'https://material.angularjs.org/latest/demo/autocomplete'
      },
      {
        url: 'https://material.angularjs.org/latest/demo/checkbox'
      },
      {
        url: 'https://material.angularjs.org/latest/demo/fabToolbar'
      },
      {
        url: 'https://material.angularjs.org/latest/demo/menu'
      },
      {
        url: 'https://material.angularjs.org/latest/demo/navBar'
      }
    ];

    const groups = this.splitIntoGroups(test);

    const win = this.winService;

    groups.forEach(function(tests) {
      const fork = win.nativeWindow.child_process.fork('./src/background/runtest.js');

      fork.on('message', (result) => {
        console.log('result: ', result);
      });

      fork.send({msgtype: 'dependencies', content: tests});
      fork.send({msgtype: 'command', content: 'begin'});
    });
  }
}
