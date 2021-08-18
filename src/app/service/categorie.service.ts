import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie} from '../model/categorie'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
 // private baseUrl = 'http://localhost:8080/api/categories';
 private baseUrl = 'http://localhost:8080/api/categories';
 private djurl='http://localhost:8000/categories/'
 private baseUrl1 = '/api/categories/7';
  choixmenu : string  = 'A';
  list : any=[];
  public formData:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
getNumero()
{
   return this.http.get(`${this.baseUrl1}`);
}

  createData(info: Object): Observable<Object> {
    //return this.http.post(`${this.baseUrl}`, info);
    return this.http.post(`${this.djurl}`, info);
  }
  
  updatedata(id: string, value: any): Observable<Object> {
    //return this.http.put(`${this.baseUrl}/${id}`, value);
    return this.http.put(`${this.djurl}${id}/`, value);
  }
 
  deleteData(id: string): Observable<any> {
   
   // java return this.http.delete(`${this.djurl}/${id}`, { responseType: 'text' });
    return this.http.delete(`${this.djurl}${id}/`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
   
    return this.http.get(`${this.djurl}`);
  }
  
}
