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
  public AddCategory(Role: any): Promise<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    });
    return this.http
      .post<any>(
        `${this.apiLink}/Category/AddNewCategory`,
        JSON.stringify(Role),
        {
          headers: headers,
        }
      )
      .toPromise();
  }

  //delete product
  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/Category/DeleteCategory/${id}`
    );
  }

  //update product detail
  updateCategory(id: number, data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    });
    return this.http.post<any>(
      `${this.apiLink}/Category/UpdateCategory`,
      JSON.stringify(data)
    );
  }
}
