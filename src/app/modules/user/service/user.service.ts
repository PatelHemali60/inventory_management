import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiLink!: any;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  // http://localhost:13884/api/User/GetAllUser

  //get role
  getallUser(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/User/GetAllUser`);
  }

  //ragistration api
  public AddUser(User: any): Promise<any> {
    // var headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   responseType: 'json',
    // });
    return this.http
      .post<any>(`${this.apiLink}/User/AddNewUser`, User)
      .toPromise();
  }

  //delete product
  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/User/DeleteUser/${id}`);
  }

  GetUserbyId(id: number): Observable<any> {
    return this.http.get<number>(
      `http://localhost:13884/api/User/GetUser/${id}`
    );
  }

  //update user data
  updateUSer(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/User/UpdateUser`, data)
      .toPromise();
  }
}
