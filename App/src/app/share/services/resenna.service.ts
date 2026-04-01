import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BaseAPI } from '../base-api';
import { ResennaModel } from '../models/ResennaModel';

@Injectable({
    providedIn: 'root'
})
export class ResennaService extends BaseAPI<ResennaModel> {

    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            environment.endPointResenna);
    }
}