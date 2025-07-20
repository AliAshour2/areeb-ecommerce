import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {Products } from '../../../shared/models/prodcuts.model';
import { RouteApiResponse } from '../../../shared/models/api.model';
import { GetAllProductsEndPoint } from '../../../shared/constants/app.constants';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }



  getAllProducts(): Observable<Products[]> {
    return this.http.get<RouteApiResponse<Products[]>>(GetAllProductsEndPoint)
      .pipe(map((response: RouteApiResponse<Products[]>) => response.data.flat()));
  }

}
