import { Component } from '@angular/core';
import { ProductoService } from '../../share/services/producto.service';
import { EtiquetaService } from '../../share/services/etiqueta.service';
import { ProductoModel } from '../../share/models/ProductoModel';
import { EtiquetaModel } from '../../share/models/EtiquetaModel';
import { NotificationService } from '../../share/notification-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  standalone: false,
  templateUrl: './producto-index.html',
  styleUrl: './producto-index.css'
})
export class ProductoIndex {
  allProductos: ProductoModel[] = [];
  datos: ProductoModel[] = [];
  etiquetas: EtiquetaModel[] = [];
  selectedEtiquetas = new Set<number>();
  searchTerm = '';
  filtersVisible = true;

  constructor(
    private vjService: ProductoService,
    private etiquetaService: EtiquetaService,
    private noti: NotificationService,
    private router: Router
  ) {
    this.listProductos();
    this.listEtiquetas();
  }

  listProductos() {
    this.vjService.get().subscribe((respuesta: ProductoModel[]) => {
      this.allProductos = respuesta;
      this.applyFilters();
    });
  }

  listEtiquetas() {
    this.etiquetaService.get().subscribe((respuesta: EtiquetaModel[]) => {
      this.etiquetas = respuesta;
    });
  }

  toggleEtiqueta(id: number) {
    if (this.selectedEtiquetas.has(id)) {
      this.selectedEtiquetas.delete(id);
    } else {
      this.selectedEtiquetas.add(id);
    }
    this.applyFilters();
  }

  isSelected(id: number): boolean {
    return this.selectedEtiquetas.has(id);
  }

  clearFilters() {
    this.selectedEtiquetas.clear();
    this.searchTerm = '';
    this.applyFilters();
  }

  applyFilters() {
    let result = this.allProductos;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p => p.nombre.toLowerCase().includes(term));
    }

    if (this.selectedEtiquetas.size > 0) {
      result = result.filter(p =>
        p.etiquetas?.some(ep => this.selectedEtiquetas.has(ep.etiquetaId))
      );
    }

    this.datos = result;
  }

  detalle(id: number) {
    this.router.navigate(['/producto', id]);
  }

  comprar(producto: ProductoModel) {
    this.noti.success('Compra', 'Producto comprado: ' + producto.nombre, 6000);
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
