import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
