import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing-module';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductoIndex } from './producto-index/producto-index';
import { ProductoDetail } from './producto-detail/producto-detail';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductoIndex,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    MatRadioModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ProductoDetail,
  ]
})
export class ProductoModule { }
