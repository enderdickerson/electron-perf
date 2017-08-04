import {Injectable} from '@angular/core';
import { WindowService } from './window.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class TestService {
  count: number;
  maxThreads: number;
  pendingTests: boolean;
  // pendingTests: Subject<boolean> = new Subject<boolean>();

  constructor(private winService: WindowService) {
    this.maxThreads = 4;
    this.count = 0;
    this.pendingTests = false;
    // this.pendingTests.next(false);
  }

  public getPendingTests() {
    return this.pendingTests;
  }

  splitIntoGroups(original) {
    let threads = this.maxThreads;

    if (original.length < this.maxThreads) {
      threads = original.length;
    }

    const start = [];

    for (let i = 0; i < threads; i++) {
      start.push([]);
    }

    original.sort((a, b) => {
      const pathA = new URL(a.url).pathname;
      const pathB = new URL(b.url).pathname;

      if (pathB < pathA) {
        return 1;
      }

      if (pathB > pathA) {
        return -1;
      }

      return pathB === pathA;
    });

    return original.map((x) => {
       return [x];
    }).reduce((arr, item, index) => {
      const arrPoint = index % threads;

      arr[arrPoint] = arr[arrPoint].concat(item);

      return arr;
    }, start);
  }

  runTest(test: any) {
    const groups = this.splitIntoGroups(test);

    const win = this.winService;

    this.pendingTests = true;
    console.log('Setting pending to true');

    let count = this.count;
    let threads = this.maxThreads;

    if (test.length < this.maxThreads) {
      threads = test.length;
    }

    new Notification('Speed test started', {
      body: 'URL Perf is now testing'
    });

    let self = this;

    groups.forEach(function(tests) {
      const fork = win.nativeWindow.child_process.fork('./src/background/runtest.js');

      fork.on('message', (result) => {
        count++;

        if (count >= threads) {
          self.pendingTests = false;

          count = 0;
          console.log('Setting pending to false');
          const finished = new Notification('Speed test finished', {
            body: 'URL Perf has new results available'
          });

          finished.onclick = () => {
            console.log('Notification clicked');
          };
        }
      });

      fork.send({msgtype: 'dependencies', content: tests});
      fork.send({msgtype: 'command', content: 'begin'});
    });
  }
}
