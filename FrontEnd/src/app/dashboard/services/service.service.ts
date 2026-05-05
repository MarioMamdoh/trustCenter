import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/constant/service';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  editMode = false;
  private mainAPI = environment.MainAPI;
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/services`);
  }
  getById(id: string, lang?: string): Observable<any> {
    let url = `${this.mainAPI}/services/${id}`;
    if (lang) {
      url += `?lang=${lang}`;
    }
    return this.http.get(url);
  }
  create(service: Service): Observable<any> {
    return this.http.post(`${this.mainAPI}/services`, service, {
      responseType: 'json',
    });
  }
  update(service: Service, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/services/${id}`, service, {
      responseType: 'json',
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/services/${id}`, {
      responseType: 'json',
    });
  }
  uploadImage(file: File, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.post(`${this.mainAPI}/services/upload/${id}`, formData, {
      responseType: 'json',
    });
  }
  deleteImage(id: string) {
    return this.http.delete(`${this.mainAPI}/services/file/${id}`, {
      responseType: 'json',
    });
  }
  updateImage(file: File, fileId: string, id: string) {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.patch(
      `${this.mainAPI}/services/file/${fileId}/${id}`,
      formData,
      {
        responseType: 'json',
      }
    );
  }
}
