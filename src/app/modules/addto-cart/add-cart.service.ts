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

  //get role
  public AddtoCart(): Observable<any> {
    return this.http.get<any>(`${this.apiLink}/UserCart/AddOrUpdateCart`);
  }

  // http://localhost:13884/api/Order/GetAllProductFromCartByUserId/13

  //get all product in cart based on user id
  public getAllProductformcart(UserId: number): Promise<any> {
    return this.http
      .get<number>(
        `${this.apiLink}/Order/GetAllProductFromCartByUserId/${UserId}`
      )
      .toPromise();
  }

  //ragistration api
  public Addtocart(Role: any): Promise<any> {
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

  // http://localhost:13884/api/UserCart/RemoveCartProduct/1

  //delete product
  public RemovefromCart(Cartid: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiLink}/UserCart/RemoveCartProduct/${Cartid}`
    );
  }
}
