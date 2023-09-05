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
    // http://localhost:13884/api/Product/GetAllProduct/0
    return this.http.get<any>(`${this.apiLink}/Product/GetAllProduct/0`);
  }

  //api for get subcategory based on category
  // http://localhost:13884/api/SubCategory/GetSubCategoryByCategory/3

  //get role
  public getsubCategory(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiLink}/SubCategory/GetSubCategoryByCategory/${id}`
    );
  }
  // http://localhost:13884/api/Product/AddNewProduct
  //ragistration api
  public AddProduct(Role: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Product/AddNewProduct`, Role)
      .toPromise();
  }

  //delete product
  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/Product/DeleteProduct/${id}`
    );
  }

  GetProductbyId(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiLink}/Product/GetProduct/${id}`);
  }

  //update product detail
  updateProduct(data: any): Promise<any> {
    debugger;
    return this.http
      .post<any>(`${this.apiLink}/Product/UpdateProduct`, data)
      .toPromise();
  }
}
