import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
      RouterModule.forRoot([
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
          {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
          {path: 'results', loadChildren: 'app/results/results.module#ResultsModule'},
          {path: 'test', loadChildren: 'app/test/test.module#TestModule'}
      ], { enableTracing: true } )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
