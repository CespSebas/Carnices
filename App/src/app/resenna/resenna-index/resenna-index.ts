import { Component } from '@angular/core';
import { ResennaService } from '../../share/services/resenna.service';
import { ResennaModel } from '../../share/models/ResennaModel';
import { NotificationService } from '../../share/notification-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenna-index',
  standalone: false,
  templateUrl: './resenna-index.html',
  styleUrl: './resenna-index.css'
})
export class ResennaIndex {
  //Respuesta del API
  datos: any;

  constructor(private rsService: ResennaService,
    private noti: NotificationService,
    private router: Router
  ) {
    this.listResennas()
  }
  columnas: string[] = [
    'usuario',
    'producto',
    'fecha',
    'valoracion',
    'detalle'
  ];

  //Listar todas las reseñas del API
  listResennas() {
    //localhost:3000/resenna
    this.rsService.get().subscribe((respuesta: ResennaModel[]) => {
      console.log(respuesta);
      this.datos = respuesta;

    });
  }
  detalle(id: Number) {
    this.router.navigate(['/resenna', id])
  }

}
