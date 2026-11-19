import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { GaleriaComponent } from './features/burritolector/galeria/galeria.component';
import { DetalleComponent } from './features/burritolector/detalle/detalle.component';
import { AfinidadComponent } from './features/burritolector/afinidad/afinidad.component';

export const routes: Routes = [
  // Rutas públicas
  {
    path: 'burritolector/login',
    component: LoginComponent
  },
  {
    path: 'burritolector/registro',
    component: RegisterComponent
  },

  // Rutas privadas con Layout y AuthGuard
  {
    path: 'burritolector',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'galeria',
        component: GaleriaComponent
      },
      {
        path: 'galeria/:id',
        component: DetalleComponent
      },
      {
        path: 'afinidad',
        component: AfinidadComponent
      },
      {
        path: '',
        redirectTo: 'galeria',
        pathMatch: 'full'
      }
    ]
  },

  // Redirección raíz y wildcard
  {
    path: '',
    redirectTo: '/burritolector/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/burritolector/login'
  }
];
