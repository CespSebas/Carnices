import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductoService } from '../../share/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  templateUrl: './producto-detail.html',
  styleUrls: ['./producto-detail.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProductoDetail {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  promedioValoracion: number = 0;
  constructor(
    private prService: ProductoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) this.obtenerProducto(Number(id));
  }

  obtenerProducto(id: number) {
    this.prService.getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log('Datos completos:', this.datos);

        if (this.datos && this.datos.resennas) {
          console.log('Reseñas:', this.datos.resennas);

          const reseñas = this.datos.resennas;
          if (reseñas.length === 0) {
            this.promedioValoracion = 0;
          } else {
            const suma = reseñas.reduce((acc: number, r: any) => acc + r.valoracion, 0);
            this.promedioValoracion = suma / reseñas.length;
          }
          console.log('Promedio de valoraciones:', this.promedioValoracion);
        }
      });
  }

  // En tu componente
currentImageIndex: number = 0;

nextImage(): void {
    if (this.datos?.imagenes) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.datos.imagenes.length;
    }
}

prevImage(): void {
    if (this.datos?.imagenes) {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.datos.imagenes.length) % this.datos.imagenes.length;
    }
}

changeImage(index: number): void {
    this.currentImageIndex = index;
}

  goBack(): void {
    this.router.navigate(['/producto/']);
  }

  
generateStars(rating: number): {icon: string, class: string}[] {
  return Array(5).fill(0).map((_, i) => {
    if (i + 1 <= rating) return {icon: 'star', class: 'full-star'};
    if (i < rating) return {icon: 'star_half', class: 'half-star'};
    return {icon: 'star_border', class: 'empty-star'};
  });
}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  
 
}