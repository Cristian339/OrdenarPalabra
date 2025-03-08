import { InicioComponent } from './inicio/inicio.component';
import { Routes } from '@angular/router';
import { InfantilComponent } from './infantil/infantil.component';
import { PrimariaComponent } from './primaria/primaria.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'infantil', component: InfantilComponent },
  { path: 'primaria', component: PrimariaComponent },
];
