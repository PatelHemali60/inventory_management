import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  // http://localhost:13884/api/DiscountType/GetAllDiscountType

  //get data by id in form
  getById(id: number) {
    return this.http.get<any>(`${this.apiLink}/Role/GetAllRole/${id}`);
  }

  //get role
  getDiscountType(): Observable<any> {
    return this.http.get<any>(
      `${this.apiLink}/DiscountType/GetAllDiscountType`
    );
  }

  //ragistration api
  public AddDiscount(Role: any): Promise<any> {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post<any>(
        `${this.apiLink}/DiscountType/AddNewDiscountType`,
        JSON.stringify(Role),
        {
          headers: headers,
        }
      )
      .toPromise();
  }

  //delete product
  deleteDiscount(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/DiscountType/DeleteDiscountType/${id}`
    );
  }

  //update product detail
  updateDiscount(data: any): Promise<any> {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post<any>(
        `${this.apiLink}/DiscountType/UpdateDiscountType`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      )
      .toPromise();
  }
}
