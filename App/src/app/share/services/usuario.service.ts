import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { UsuarioModel } from '../models/UsuarioModel';

@Injectable({
    providedIn: 'root'
})
export class usuarioService extends BaseAPI<UsuarioModel> {

    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            environment.endPointUsuario);
    }
}