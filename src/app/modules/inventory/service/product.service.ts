import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //http://localhost:13884/api/Product/GetAllProduct

  //get role
  getallProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Product/GetAllProduct`);
  }

  //ragistration api
  public AddProduct(Role: any): Promise<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    });
    return this.http
      .post<any>(`${this.apiLink}/Brand/AddNewBrand`, Role, {
        headers: headers,
      })
      .toPromise();
  }

  //delete product
  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/Product/DeleteProduct/${id}`
    );
  }

  // http://localhost:13884/api/Brand/UpdateBrand'
  //update product detail
  updateProduct(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    });
    return this.http.post<any>(
      `http://localhost:13884/api/Brand/UpdateBrand`,
      data,
      { headers: headers }
    );
  }
}
