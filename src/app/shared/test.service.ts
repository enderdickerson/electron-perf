import {Injectable, OnInit} from '@angular/core';

import { WindowService } from './window.service';
import { Observable } from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {isBoolean} from 'util';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class TestService {
  count: number;
  maxThreads: number;
  pendingTests: Subject<boolean> = new Subject<boolean>();

  constructor(private winService: WindowService) {
    this.maxThreads = 4;
    this.count = 0;
    this.pendingTests.next(false);
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

    this.pendingTests.next(true);
    console.log('Setting pending to true');

    let count = this.count;
    let threads = this.maxThreads;

    if (test.length < this.maxThreads) {
      threads = test.length;
    }

    const pendingTests = this.pendingTests;

    groups.forEach(function(tests) {
      const fork = win.nativeWindow.child_process.fork('./src/background/runtest.js');

      fork.on('message', (result) => {
        count++;

        if (count >= threads) {
          pendingTests.next(false);
          count = 0;
          console.log('Setting pending to false');
        }
      });

      fork.send({msgtype: 'dependencies', content: tests});
      fork.send({msgtype: 'command', content: 'begin'});
    });
  }
}
