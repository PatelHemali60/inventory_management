import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }
  //get category
  public getCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Category/GetAllCategory`);
  }

  //get role
  public getsubCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/SubCategory/GetAllSubCategory`);
  }

  //ragistration api
  public AddsubCategory(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/SubCategory/AddNewSubCategory`, data)
      .toPromise();
  }

  //delete product
  deletesubCategory(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/SubCategory/DeleteSubCategory/${id}`
    );
  }

  //update product detail
  updateSubCategory(id: number, data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/SubCategory/UpdateSubCategory`, data)
      .toPromise();
  }
}

//update product detail
// updateBrand(data: any): Promise<any> {
//   return this.http
//     .post<any>(`${this.apiLink}/Brand/UpdateBrand`, data)
//     .toPromise();
// }
