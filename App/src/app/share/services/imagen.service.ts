import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ImagenModel } from '../models/ImagenModel';

@Injectable({ providedIn: 'root' })
export class ImagenService {
  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  uploadParaProducto(productoId: number, files: File[]): Observable<ImagenModel[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<ImagenModel[]>(`${this.base}/imagen/producto/${productoId}`, formData);
  }

  eliminar(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/imagen/${id}`);
  }

  setPrincipal(id: number): Observable<ImagenModel> {
    return this.http.patch<ImagenModel>(`${this.base}/imagen/${id}/principal`, {});
  }

  getUrl(filename: string): string {
    return `${this.base}/images/${filename}`;
  }
}
