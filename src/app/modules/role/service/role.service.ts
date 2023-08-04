import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public apiLink!: any;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get data by id in form
  getById(id: number) {
    return this.http.get<any>(`${this.apiLink}/product/${id}`);
  }

  //get role
  getProduct(): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole`);
  }

  //ragistration api
  public AddRole(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiLink}/Role/AddNewRole`, user);
  }

  //delete product
  deleteRole(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/Role/DeleteRole/${id}`);
  }

  //update product detail
  updateRole(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiLink}/product/${id}`, data);
  }
}
