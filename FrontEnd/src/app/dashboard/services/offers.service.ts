import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/constant/service';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  editMode = false;
  private mainAPI = environment.MainAPI;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/offers`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/offers/${id}`);
  }

  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.mainAPI}/offers`, offer, {
      responseType: 'json',
    });
  }

  update(offer: Offer, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/offers/${id}`, offer, {
      responseType: 'json',
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/offers/${id}`, {
      responseType: 'json',
    });
  }

  uploadImage(file: File, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.post(`${this.mainAPI}/offers/upload/${id}`, formData, {
      responseType: 'json',
    });
  }

  deleteImage(id: string) {
    return this.http.delete(`${this.mainAPI}/offers/file/${id}`, {
      responseType: 'json',
    });
  }

  updateImage(file: File, fileId: string, id: string) {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.patch(
      `${this.mainAPI}/offers/file/${fileId}/${id}`,
      formData,
      {
        responseType: 'json',
      }
    );
  }
}
