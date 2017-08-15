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

    // const path = window.require('path');

    const remote = window.require('electron').remote;

    const appPath = remote.app.getAppPath();

    console.log('Current Dir: ', appPath);

    const log = window.require('electron-log');

    win.nativeWindow.logger.error('Starting tests');

    groups.forEach(function(tests) {
      console.log('Current Dir: ', appPath);

      console.log('DIR for background: ', win.nativeWindow.path.join(appPath, 'src/background/runtest.js'));

      const fork = win.nativeWindow.child_process.fork(win.nativeWindow.path.join(appPath, 'src/background/runtest.js'),
        [], {stdio: ['pipe', 'pipe', 'pipe', 'ipc'], env: {ATOM_SHELL_INTERNAL_RUN_AS_NODE : 0}});

      fork.stderr.on('data', (err, bar, baz) => {
        win.nativeWindow.logger.error('Error: ' + err);
      });

      fork.on('message', (result) => {
        // if (result.msgtype === 'command' && result.content === 'updateWebDriver') {
        //   console.error('Update webdriver');
        //   self.updateWebDriver();
        //   fork.send({msgtype: 'command', content: 'updateWebDriverFinished'});
        // } else if (result.msgtype === 'command' && result.content === 'startProtractor') {
        //   console.error('Start protractor');
        //   fork.send({msgtype: 'command', content: 'protractorFinished'});
        // } else {
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
        // }
      });

      fork.send({msgtype: 'dependencies', content: tests});
      fork.send({msgtype: 'command', content: 'begin'});
    });
  }

  updateWebDriver() {
    const win = this.winService;

    const remote = window.require('electron').remote;

    const appPath = remote.app.getAppPath();

    // if (config.proxy) {
    //   console.error('using proxy: ' + config.proxy);
    // }
    //

    // const webDriverPath = win.nativeWindow.path.join(appPath, 'node_modules', 'webdriver-manager', 'bin', 'webdriver-manager');

    // runCmdExec('node ' + webdriverPath + ' update --ignore_ssl ' + (config.proxy ? ('--proxy ' + config.proxy) : '') + ' --gecko false', deferred);

    // win.nativeWindow.child_process.fork('node', [''])
  }

  startProtractor() {
    // const protractorPath = win.nativeWindow.path.join(appPath, 'node_modules', 'protractor', 'bin', 'protractor');
    //
    // const confPath = win.nativeWindow.path.join(appPath, 'src', 'background', 'src', 'protractorconf.js');
    //
    // runCmdExec('node ' + protractorPath + ' ' + confPath, deferred);
  }
}
