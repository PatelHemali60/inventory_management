import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorment/enviorment';

@Injectable({
  providedIn: 'root',
})
export class AddCartService {
  apiLink: string;

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  //get all product in cart based on user id
  public getAllProductformcartByUser_id(UserId: number): Promise<any> {
    return this.http
      .get<number>(
        `${this.apiLink}/Order/GetAllProductFromCartByUserId/${UserId}`
      )
      .toPromise();
  }

  //delete product
  public RemovefromCart(Cartid: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/UserCart/RemoveCartProduct/${Cartid}`
    );
  }

  public AddtoCart(item: any): Promise<any> {
    return this.http
      .post<any>(`${this.apiLink}/UserCart/AddOrUpdateCart`, item)
      .toPromise();
  }
}
