import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portada',
    loadComponent: () => import('./pages/portada/portada.component').then(m => m.PortadaComponent)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent),
    data: { title: 'Lista de bebidas' }
  },
  {
    path: 'alcohol',
    loadComponent: () => import('./pages/alcohol/alcohol.component').then(m => m.AlcoholComponent),
    data: { title: 'Alcohol' }
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.component').then(m => m.FavoritosComponent)
  },
  {
    path: ':drinkName',
    loadComponent: () => import('./pages/drink-list-by-name/drink-list-by-name.component').then(m => m.DrinkListByNameComponent),
  },
  {
    path: '**',
    redirectTo: 'portada'
  },
];
