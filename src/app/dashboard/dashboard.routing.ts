import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
  {path: '', component: DashboardComponent }
];

export const dashboardRouting = RouterModule.forRoot(routes);
