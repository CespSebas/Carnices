import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoService } from '../../share/services/pedido.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pedido-detail',
  standalone: true,
  templateUrl: './pedido-detail.html',
  styleUrls: ['./pedido-detail.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PedidoDetail {
  datos: any;
  destroy$ = new Subject<boolean>();

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.obtenerPedido(+id);
  }

  obtenerPedido(id: number) {
    this.pedidoService.getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datos = data;
        console.log('Detalle del pedido:', this.datos);
      });
  }

  calcularSubtotalProducto(item: any): number {
    return  item.cantidad * parseFloat(item.producto.precio);
  
  }

  calcularTotalPersonalizado(p: any): number {
    const base = parseFloat(p.producto.precio);
    const adicionales = p.opciones.reduce((acc: number, o: any) => acc + parseFloat(o.costo), 0);
    return base + adicionales;
  }

   


  calcularImpuestos(): number {
    return parseFloat(this.datos.total) - parseFloat(this.datos.subtotal);
  }

  goBack() {
    this.router.navigate(['/pedido']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
