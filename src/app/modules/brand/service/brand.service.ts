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

  // http://localhost:13884/api/Brand/GetAllBrand

  //get role
  getBrand(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Brand/GetAllBrand`);
  }

  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'responseType': 'json'
  // });

  //ragistration api
  public AddBrand(Role: any): Promise<any> {
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
  deleteBrand(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/Brand/DeleteBrand/${id}`);
  }

  // http://localhost:13884/api/Brand/UpdateBrand'
  //update product detail
  updateBrand(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    });
    return this.http.put<any>(
      `http://localhost:13884/api/Brand/UpdateBrand`,
      data,
      { headers: headers }
    );
  }
}
