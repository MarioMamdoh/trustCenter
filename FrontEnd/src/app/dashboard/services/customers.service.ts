import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomersService{
  editMode = false;
  private http = inject(HttpClient)
  private mainAPI = environment.MainAPI
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/customers`, { responseType: 'json' });
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/customers/${id}`, { responseType: 'json' });
  }
  create(customer: any): Observable<any> {
    return this.http.post(`${this.mainAPI}/customers`, customer, { responseType: 'json' });
  }
  update(customer: any, id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/customers/${id}`, customer, { responseType: 'json' });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.mainAPI}/customers/${id}`, { responseType: 'json' });
  }
  
}