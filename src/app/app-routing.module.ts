import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
      RouterModule.forRoot([
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
          {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
          {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
          {path: 'test', loadChildren: 'app/test/test.module#TestModule'}
      ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
