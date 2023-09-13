import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiLink: string;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  // getById(id: number) {
  //   return this.http.get<User>(`${this.apiLink}/users/${id}`);
  // }

  // 'http://localhost:13884/api

  getallProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Product/GetAllProduct/${0}`);
  }

  //ragistration api

  // return this.http.get<any>(`${this.apiLink}/UserCart/AddOrUpdateCart`)      .toPromise();

  AddtoCart(item: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/UserCart/AddOrUpdateCart`, item)
      .toPromise();
  }
}
