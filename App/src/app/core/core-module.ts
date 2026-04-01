import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Header,
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    MatBadgeModule,
  ],
  exports: [
    Header,
    Footer
  ]
})
export class CoreModule { }
