import { Component } from '@angular/core';
import { ProductoService } from '../../share/services/producto.service';
import { ProductoModel } from '../../share/models/ProductoModel';
import { NotificationService } from '../../share/notification-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  standalone: false,
  templateUrl: './producto-index.html',
  styleUrl: './producto-index.css'
})
export class ProductoIndex {
 //Respuesta del API
  datos: any;
  filtersVisible = true;

  constructor(private vjService:ProductoService,
    private noti:NotificationService,
    private router:Router
    
  ) {   
    this.listProductos()
  }

  //Listar todos los producto del API
  listProductos() {
    //localhost:3000/producto
    this.vjService.get().subscribe((respuesta: ProductoModel[]) => {
      console.log(respuesta);
      this.datos = respuesta;
      
    });
  }
  detalle(id:Number){
    this.router.navigate(['/producto',id])
  }
  comprar(producto:ProductoModel){
    this.noti.success('Compra','Producto comprado: '+producto.nombre,6000)
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  trackById(index: number, item: any): number {
  return item.id;
}



}
