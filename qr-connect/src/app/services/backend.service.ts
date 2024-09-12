import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://192.168.2.16:8080/users/';
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
  
  constructor(private httpClient: HttpClient) { }

  // create(data: any): Observable<any> {
  //   return this.httpClient.post(this.baseUrl, data, { responseType: 'text' });
  // }
  public list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'list', this.httpOptions);
  }

  public detail(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + `detail/${id}`, this.httpOptions);
  }

  public create(user: User): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'create', user, this.httpOptions);
  }

  public update(id: number, user: User): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + `update/${id}`, user, this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `delete/${id}`, this.httpOptions);
  }
}
