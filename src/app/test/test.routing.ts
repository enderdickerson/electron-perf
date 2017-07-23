import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes = [
  {path: '', component: TestComponent }
];

export const testRouting = RouterModule.forRoot(routes);
