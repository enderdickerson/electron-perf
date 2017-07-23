// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

// Custom imports
import { MenuContainer } from './menu/menu.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TabMenuModule
    ],
    exports: [
      MenuContainer
    ],
    declarations: [
      MenuContainer,
    ],
    providers: [
    ],
})

export class MenuModule { }
