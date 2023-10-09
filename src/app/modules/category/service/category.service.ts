import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public apiLink!: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get role
  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/Category/GetAllCategory`);
  }

  //ragistration api
  public AddCategory(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Category/AddNewCategory`, data)
      .toPromise();
  }

  //delete product
  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/Category/DeleteCategory/${id}`
    );
  }

  //update product detail
  updateCategory(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Category/UpdateCategory`, data)
      .toPromise();
  }
}
