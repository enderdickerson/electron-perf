import { NgModule } from '@angular/core';

import { WindowService } from './window.service';
import { ResultService } from './result.service';
import { TestService } from './test.service';
import {TestStore} from './test.store';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    WindowService,
    ResultService,
    TestService,
    TestStore
  ]
})

export class SharedModule { }
