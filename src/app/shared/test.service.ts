import {Injectable} from '@angular/core';
import { WindowService } from './window.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()

export class TestService {
  count: number;
  maxThreads: number;
  // pendingTests: boolean;
  pendingTests: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private winService: WindowService) {
    this.maxThreads = 4;
    this.count = 0;
    // this.pendingTests = false;
    // this.pendingTests.next(false);
  }

  public getPendingTests(): Observable<boolean> {
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

    // this.pendingTests = true;
    this.pendingTests.next(true);

    let count = this.count;
    let threads = this.maxThreads;

    if (test.length < this.maxThreads) {
      threads = test.length;
    }

    const noti = new Notification('Speed test started', {
      body: 'URL Perf is now testing'
    });

    const self = this;

    const log = window.require('electron-log');

    win.nativeWindow.logger.error('Starting tests');

    const remote = window.require('electron').remote;

    const appPath = remote.app.getAppPath();

    groups.forEach(function(tests) {
      console.error('DIR for background: ', win.nativeWindow.path.join(appPath, 'src/background/runtest.js'));

      const fork = win.nativeWindow.child_process.fork(win.nativeWindow.path.join(appPath, 'src/background/runtest.js'),
        [], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});

      fork.stderr.on('data', (err) => {
        win.nativeWindow.logger.error('Error: ' + err);
      });

      fork.on('message', (result) => {
        count++;

        if (count >= threads) {
          self.pendingTests.next(false);

          count = 0;
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
