import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes = [
  {path: '', component: PagesComponent }
];

export const pagesRouting = RouterModule.forRoot(routes);
