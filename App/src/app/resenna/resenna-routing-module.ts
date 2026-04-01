import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResennaIndex } from './resenna-index/resenna-index';
import { ResennaDetail } from './resenna-detail/resenna-detail';
const routes: Routes = [
  { path: 'resenna', component: ResennaIndex },
  { path: 'resenna/:id', component: ResennaDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResennaRoutingModule { }
