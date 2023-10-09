import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get role
  getBrand(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Brand/GetAllBrand`);
  }

  //ragistration api
  public AddBrand(Role: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Brand/AddNewBrand`, Role)
      .toPromise();
  }

  //delete product
  deleteBrand(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/Brand/DeleteBrand/${id}`);
  }

  // http://localhost:13884/api/Brand/UpdateBrand'
  //update product detail

  //update product detail
  updateBrand(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Brand/UpdateBrand`, data)
      .toPromise();
  }
}
