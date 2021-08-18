import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlServicioRest = 'http://localhost:8000/categorie/list/';
  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.urlServicioRest);
  }

}
