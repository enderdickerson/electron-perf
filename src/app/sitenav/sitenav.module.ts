// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

// Custom imports
import { SiteNavComponent } from './sitenav/sitenav.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TabMenuModule
    ],
    exports: [
      SiteNavComponent
    ],
    declarations: [
      SiteNavComponent,
    ],
    providers: [
    ],
})

export class SiteNavModule { }
