import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false, // opcional, por defecto false
})


export class App {
  protected title = 'app';
/*
  constructor(private translate: TranslateService) {
  this.translate.setDefaultLang('es');
  this.translate.use('es');
}

*/
}
