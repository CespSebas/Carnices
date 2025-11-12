import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteBaseModel } from '../models/ReporteBaseModel';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  urlAPI: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getVentasPorDia(): Observable<any> {
    return this.http.get<any>(this.urlAPI + '/reporte/ventas-dia/');
  }

  getVentasPorMes(mes:number): Observable<any> {
    return this.http.get<any>(this.urlAPI + '/reporte/ventas-mes/'+mes);
  }
}
