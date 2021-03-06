import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SiteNavModule } from './sitenav/sitenav.module';
import { TestModule } from './test/test.module';
import { AppRoutingModule } from './app-routing.module';
import { ResultsModule } from './results/results.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ConfirmDialogModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    SiteNavModule,
    ResultsModule,
    TestModule,
    ToolbarModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
