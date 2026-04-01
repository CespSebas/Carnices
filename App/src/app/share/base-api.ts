import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
export interface BaseEntity {
  id?: number;
}
@Injectable({
  providedIn: 'root',
})
export class BaseAPI<T extends BaseEntity> {
  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    @Inject(String) private endpoint: string
  ) {}
 
  get(): Observable<T[]> {
    return this.http.get<T[]>(`${this.urlAPI}/${this.endpoint}`);
  }
  
  getMethod(
    action: string,
    options: { [param: string]: unknown } = {}
  ): Observable<T | T[]> {
    return this.http.get<T[]>(
      `${this.urlAPI}/${this.endpoint}/${action}`,
      options
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.urlAPI}/${this.endpoint}/${id}`);
  }

  /*
  */

  create(item: T | FormData, action: string = 'create'): Observable<T> {
  const url = action 
    ? `${this.urlAPI}/${this.endpoint}/${action}` 
    : `${this.urlAPI}/${this.endpoint}`;
  return this.http.post<T>(url, item);
}


 update(id: number, data: FormData, action: string = 'update'): Observable<T> {
  const url = action 
    ? `${this.urlAPI}/${this.endpoint}/${action}/${id}`
    : `${this.urlAPI}/${this.endpoint}/${id}`;
  return this.http.put<T>(url, data);
}



  delete(item: T) {
    return this.http.delete<T>(`${this.urlAPI}/${this.endpoint}/${item.id}`);
  }
}
