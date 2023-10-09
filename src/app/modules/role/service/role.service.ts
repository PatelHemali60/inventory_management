import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get data by id in form
  getById(id: number) {
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole/${id}`);
  }

  //get role
  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole`);
  }

  //ragistration api
  public AddRole(Role: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Role/AddNewRole`, Role)
      .toPromise();
  }

  //delete product
  deleteRole(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/Role/DeleteRole/${id}`);
  }

  //update product detail
  updateRole(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Role/UpdateRole`, data)
      .toPromise();
  }
}
