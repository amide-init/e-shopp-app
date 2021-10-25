import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get('http://localhost:8080/product/');
  }
  login(data): Observable<any> {
    return this.http.post('http://localhost:8080/user/login', data ); 
  }
  signup(data):Observable<any>  {
    return this.http.post('http://localhost:8080/user/signup', data );
  }

  getProfile():Observable<any> {
    const headers = {
      'authorization':  "Bearer " +  localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8080/user',  {headers: headers }); 
  }
}
