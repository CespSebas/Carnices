import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoIndex } from './pedido-index/pedido-index';
import { PedidoDetail } from './pedido-detail/pedido-detail';

const routes: Routes = [
  { path: 'pedido', component: PedidoIndex },
  { path: 'pedido/:id', component: PedidoDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
