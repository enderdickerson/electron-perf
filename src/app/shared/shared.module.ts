import { NgModule } from '@angular/core';

import { WindowService } from './window.service';
import { ResultService } from './result.service';
import { TestService } from './test.service';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    WindowService,
    ResultService,
    TestService
  ]
})

export class SharedModule { }
