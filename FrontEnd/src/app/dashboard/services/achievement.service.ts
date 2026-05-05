import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroment';
import { Observable } from 'rxjs';
export enum AchievementType {
  SERVED = 'served',
  TEAM = 'team',
  EXPERIENCE = 'experience',
  AMBULANCE = 'ambulance',
}
@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private http = inject(HttpClient);
  private mainAPI = environment.MainAPI;
  getAll(): Observable<any> {
    return this.http.get(`${this.mainAPI}/achievements`, {
      responseType: 'json',
    });
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/achievements/${id}`, {
      responseType: 'json',
    });
  }

  update(type: AchievementType, count: number): Observable<any> {
    return this.http.patch(
      `${this.mainAPI}/achievements/${type}`,
      { count: count },
      {
        responseType: 'json',
      }
    );
  }
  increment(type: AchievementType): Observable<any> {
    return this.http.patch(`${this.mainAPI}/achievements/increment/${type}`, {
      responseType: 'json',
    });
  }
  decrement(type: AchievementType): Observable<any> {
    return this.http.patch(`${this.mainAPI}/achievements/decrement/${type}`, {
      responseType: 'json',
    });
  }
}
