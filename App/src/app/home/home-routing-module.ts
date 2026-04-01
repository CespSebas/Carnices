import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaDe } from './acerca-de/acerca-de';
import { Inicio } from './inicio/inicio';

const routes: Routes = [
  { path: 'inicio', component: Inicio }, // Agrega esta línea
  { path:'acercade', component: AcercaDe },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }