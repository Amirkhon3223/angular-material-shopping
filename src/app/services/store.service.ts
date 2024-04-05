import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllProducts(limit: number, sort: string, category?: string): Observable<Array<Product>> {
    const categoryPath = category ? `/category/${category}` : '';
    const queryParams = `?sort=${sort}&limit=${limit}`;
    return this.http.get<Array<Product>>(
      `${environment.apiBaseUrl}/products${categoryPath}${queryParams}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.apiBaseUrl}/products/categories`);
  }
}
