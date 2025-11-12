import { NgModule } from '@angular/core';
 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// ✅ Crea loader para cargar archivos JSON de traducción
export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      fallbackLang: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: []
      }
    })
  ],
  exports: [TranslateModule]
})
export class TranslationModule {}