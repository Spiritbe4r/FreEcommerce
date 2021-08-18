import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../model/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private urlServicioRest = 'http://localhost:8000/product/suppliers/list/';
  constructor(private httpClient: HttpClient) { }

  getSupplierList(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.urlServicioRest);
  }
}
