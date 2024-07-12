import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'pwd-strength'
    },
    {
      path: 'pwd-strength',
      loadComponent: () => import('../app/pwd-strength/pwd-strength.component').then(m => m.PwdStrengthComponent)
    },
];
