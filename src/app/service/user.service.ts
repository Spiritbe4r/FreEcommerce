import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../model/user';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, FormControl,ReactiveFormsModule,Validators}
from '@angular/forms';
const headers= new HttpHeaders()
  .set('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')

@Injectable({
  providedIn: 'root'
})


export class UserService {

 

  private baseUrl = 'http://localhost:8000/user/';
  private djUrl='http://localhost:8000/api/auth/register/'
  private djUPurl='http://localhost:8000/api/auth/update';
  list:  any=[];
  islogin = false;
  admin = false;
  suser = false;
  client = false;
  four = false;
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
  name : string = "Carlos";

  baseSpring="hhtp://localhost:8080/api/users"

  public formData:  FormGroup; 
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  login(username :string,pwd : string ) {
    return this.http.get(`${this.baseUrl}/auth/${username}`);
   
   } 
   
   verifEmail(email :string) {
    return this.http.get(`${this.baseUrl}/verif/${email}`);
   
   }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
  
    return this.http.post(`${this.djUrl}`, info);
  }
  
  updatedata(id: number, info: Object): Observable<Object> {
    return this.http.patch(`${this.djUPurl}/${id}/`, info);
  }
  
  
  
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}${id}/`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  

  
  getUser(){
    return this.http.get(`${this.baseSpring}/getUsers`)
  }
  
  }


  /*headers: {
          'content-type': 'multipart/form-data',
          'X-CSRFTOKEN': CSRF_TOKEN
        }*/