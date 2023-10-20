import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiLink!: any;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get role
  public getUser_Id(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole`);
  }
  //ragistration api
  public createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiLink}/User/AddNewUser`, user);
  }

  //login api
  public Login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiLink}/User/LoginUser`, data);
  }

  public getAlluserRole(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole`);
  }

  public getallUser(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/User/GetAllUser`);
  }
}
