import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndex } from './producto-index/producto-index';
import { ProductoDetail } from './producto-detail/producto-detail';
const routes: Routes = [
  { path: 'producto', component: ProductoIndex },
  { path: 'producto/:id', component: ProductoDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
