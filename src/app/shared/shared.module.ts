import { NgModule } from '@angular/core';

import { WindowService } from './window.service';
import { ResultStore } from './result.store';
import { TestService } from './test.service';
import { TestStore } from './test.store';
import { ConnectionService } from './connection.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    WindowService,
    ResultStore,
    TestService,
    TestStore,
    ConnectionService
  ]
})

export class SharedModule { }
