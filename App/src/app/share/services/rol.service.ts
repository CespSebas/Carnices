import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { RolModel } from '../models/RolModel';

@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseAPI<RolModel> {

    constructor(httpClient: HttpClient) { 
        super(
          httpClient,
          environment.endPointRol);
      }
}