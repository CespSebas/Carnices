import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { ProductoModel } from '../models/ProductoModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseAPI<ProductoModel> {

    constructor(httpClient: HttpClient) { 
        super(
          httpClient,
          environment.endPointProducto);
      }
}