import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private baseUrl = 'http://localhost:8180/'; // URL de Keycloak
  private clientId = 'admin-cli'; 
  private clientSecret = 'vBSLcMoCg8VRt5AaLxWlv17KUkaJOUWw'; 

  constructor(private http: HttpClient) {}

  // Obtener token
  getToken(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    return this.http.post<any>(`${this.baseUrl}/realms/master/protocol/openid-connect/token`, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      map(response => response.access_token),
      catchError(this.handleError<string>('getToken'))
    );
  }

  // Obtener todos los realms
  getRealms(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/realms`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError<any[]>('getRealms', []))
    );
  }

  // Obtener clients de un realm
  getClients(realm: string, token: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/realms/${realm}/clients`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError<any[]>('getClients', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
