import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service, Blog } from '../models/constant/service';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  editMode = false;
  private mainAPI = environment.MainAPI;
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/blogs`);
  }
  getById(id: string, lang?: string): Observable<any> {
    let url = `${this.mainAPI}/blogs/${id}`;
    if (lang) {
      url += `?lang=${lang}`;
    }
    return this.http.get(url);
  }
  create(blog: Blog): Observable<any> {
    return this.http.post(`${this.mainAPI}/blogs`, blog, {
      responseType: 'json',
    });
  }
  update(blog: Blog, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/blogs/${id}`, blog, {
      responseType: 'json',
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/blogs/${id}`, {
      responseType: 'json',
    });
  }
  uploadImage(file: File, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.post(`${this.mainAPI}/blogs/upload/${id}`, formData, {
      responseType: 'json',
    });
  }
  deleteImage(id: string) {
    return this.http.delete(`${this.mainAPI}/blogs/file/${id}`, {
      responseType: 'json',
    });
  }
  updateImage(file: File, fileId: string, id: string) {
    const formData = new FormData();
    formData.append('file', file); // 'file' should match the field name in the backend

    return this.http.patch(
      `${this.mainAPI}/blogs/file/${fileId}/${id}`,
      formData,
      {
        responseType: 'json',
      }
    );
  }
}
