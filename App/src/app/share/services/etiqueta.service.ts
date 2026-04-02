import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { EtiquetaModel } from '../models/EtiquetaModel';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends BaseAPI<EtiquetaModel> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.endPointEtiqueta);
  }
}
