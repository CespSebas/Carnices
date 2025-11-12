import { Component } from '@angular/core';
import { PedidoService } from '../../share/services/pedido.service';
import { PedidoModel } from '../../share/models/PedidoModel';
import { NotificationService } from '../../share/notification-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-index',
  standalone: false,
  templateUrl: './pedido-index.html',
  styleUrl: './pedido-index.css'
})
export class PedidoIndex {
 //Respuesta del API
  datos: any;
  filtersVisible = true;
   

  constructor(private vjService:PedidoService,
    private noti:NotificationService,
    private router:Router
    
  ) {   
    this.listPedidos()
  }

  //Listar todos los pedidos del API
  listPedidos() {
    //localhost:3000/ 
    this.vjService.get().subscribe((respuesta: PedidoModel[]) => {
      console.log(respuesta);
      this.datos = respuesta;
      
    });
  }
  detalle(id:Number){
    this.router.navigate(['/pedido',id])
  }
 

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }


}
