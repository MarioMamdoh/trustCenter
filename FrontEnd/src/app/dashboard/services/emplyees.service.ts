import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  editMode = false;
  private mainApi = environment.MainAPI;
  private http = inject(HttpClient);
  getAll(): Observable<any> {
    return this.http.get(`${this.mainApi}/users`, {
      responseType: 'json',
    });
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainApi}/users/${id}`, {
      responseType: 'json',
    });
  }
  create(employee: any): Observable<any> {
    return this.http.post(`${this.mainApi}/users`, employee, {
      responseType: 'json',
    });
  }
  update(employee: any, id: string): Observable<any> {
    return this.http.patch(`${this.mainApi}/users/${id}`, employee, {
      responseType: 'json',
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainApi}/users/${id}`, {
      responseType: 'json',
    });
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.mainApi}/users/login`,
      { email, password },
      {
        responseType: 'json',
      }
    );
  }
}
