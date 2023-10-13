import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class PlaceOrderService {
  public apiLink!: any;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //ragistration api
  public PlaceOrder(Data: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/Order/PlaceOrder`, Data, {})
      .toPromise();
  }

  // http://localhost:13884/api/User/GetUser/9

  public getUserDetail(id: number): Observable<any> {
    return this.http.get<number>(`${this.apiLink}/User/GetUser/${id}`);
  }
}
