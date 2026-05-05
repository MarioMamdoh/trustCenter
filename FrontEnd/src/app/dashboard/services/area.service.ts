import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private mainAPI = environment.MainAPI;
  private http = inject(HttpClient);
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/areas`, { responseType: 'json' });
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/areas/${id}`, {
      responseType: 'json',
    });
  }
  create(area: any): Observable<any> {
    return this.http.post(`${this.mainAPI}/areas`, area, {
      responseType: 'json',
    });
  }
  update(area: any, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/areas/${id}`, area, {
      responseType: 'json',
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/areas/${id}`, {
      responseType: 'json',
    });
  }
  getAllByLocation(location: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/areas/search/${location}`, {
      responseType: 'json',
    });
  }
}
