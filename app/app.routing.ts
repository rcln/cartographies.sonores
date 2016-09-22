import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { LanguageDetailComponent }   from './language-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/cartographies',
    pathMatch: 'full'
  },
  {
    path: 'cartographies',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: LanguageDetailComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
