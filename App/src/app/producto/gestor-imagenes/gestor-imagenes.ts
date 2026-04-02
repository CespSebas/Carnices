import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenModel } from '../../share/models/ImagenModel';
import { ImagenService } from '../../share/services/imagen.service';

@Component({
  selector: 'app-gestor-imagenes',
  standalone: true,
  templateUrl: './gestor-imagenes.html',
  styleUrls: ['./gestor-imagenes.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    TranslateModule,
  ],
})
export class GestorImagenes implements OnInit {
  @Input() productoId!: number;
  @Input() imagenes: ImagenModel[] = [];

  archivosSeleccionados: File[] = [];
  previews: string[] = [];
  subiendo = false;

  constructor(private imagenService: ImagenService) {}

  ngOnInit(): void {}

  getUrl(url: string): string {
    return this.imagenService.getUrl(url);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.archivosSeleccionados = Array.from(input.files);
    this.previews = [];

    this.archivosSeleccionados.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => this.previews.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  subir(): void {
    if (!this.archivosSeleccionados.length || !this.productoId) return;

    this.subiendo = true;
    this.imagenService.uploadParaProducto(this.productoId, this.archivosSeleccionados).subscribe({
      next: (nuevas) => {
        this.imagenes = [...this.imagenes, ...nuevas];
        this.archivosSeleccionados = [];
        this.previews = [];
        this.subiendo = false;
      },
      error: () => { this.subiendo = false; },
    });
  }

  cancelarSeleccion(): void {
    this.archivosSeleccionados = [];
    this.previews = [];
  }

  setPrincipal(imagen: ImagenModel): void {
    if (imagen.esPrincipal) return;
    this.imagenService.setPrincipal(imagen.id).subscribe(() => {
      this.imagenes = this.imagenes.map(img => ({
        ...img,
        esPrincipal: img.id === imagen.id,
      }));
    });
  }

  eliminar(imagen: ImagenModel): void {
    this.imagenService.eliminar(imagen.id).subscribe(() => {
      this.imagenes = this.imagenes.filter(img => img.id !== imagen.id);
    });
  }
}
