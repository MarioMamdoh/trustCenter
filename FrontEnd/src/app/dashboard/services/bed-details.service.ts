import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BedDetailsService {
  private mainAPI = environment.MainAPI;
  private http = inject(HttpClient);
  getBedDetails(bedId: number): Observable<any> {
    return this.http.get(`${this.mainAPI}/bed-details/${bedId}`, {
      responseType: 'json',
    });
  }
  updateBedDetails(bedId: number, bedDetails: any): Observable<any> {
    return this.http.put(`${this.mainAPI}/bed-details/${bedId}`, bedDetails, {
      responseType: 'json',
    });
  }
  deleteBed(bedId: number): Observable<any> {
    return this.http.delete(`${this.mainAPI}/bed-details/${bedId}`, {
      responseType: 'json',
    });
  }
  createBedDetails(bed: any): Observable<any> {
    return this.http.post(`${this.mainAPI}/bed-details`, bed, {
      responseType: 'json',
    });
  }
  getAllBedsDetails(): Observable<any> {
    return this.http.get(`${this.mainAPI}/bed-details`, {
      responseType: 'json',
    });
  }
}
