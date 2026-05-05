import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BedsService {
  editMode = false;
  private mainAPI = environment.MainAPI;
  private http = inject(HttpClient);
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/beds`, { responseType: 'json' });
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/beds/${id}`, {
      responseType: 'json',
    });
  }
  create(bed: any): Observable<any> {
    return this.http.post(`${this.mainAPI}/beds`, bed, {
      responseType: 'json',
    });
  }
  update(bed: any, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/beds/${id}`, bed, {
      responseType: 'json',
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/beds/${id}`, {
      responseType: 'json',
    });
  }
  updateReservationStatus(id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/beds/${id}/reserve`, {
      responseType: 'json',
    });
  }
}
