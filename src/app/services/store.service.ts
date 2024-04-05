import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllProducts(limit: number, sort: string, category?: string): Observable<Array<Product>> {
    const url = category ? `products/category/${category}` : 'products';

    return this.http.get<Array<Product>>(url, {params: {sort, limit}});
  }

  getAllCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>('products/categories');
  }
}
