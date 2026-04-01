import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { PedidoModel } from '../models/PedidoModel';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseAPI<PedidoModel> {

    constructor(httpClient: HttpClient) { 
        super(
          httpClient,
          environment.endPointPedido);
      }
}