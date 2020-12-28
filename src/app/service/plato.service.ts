import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plato } from '../model/plato';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private urlEndPoint: string = 'http://localhost:9898/platos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.urlEndPoint}/all`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updatestock(plato: Plato): Observable<Plato> {
    return this.http.get<Plato>(`${this.urlEndPoint}/updatestock/${plato.idplatos}/${plato.cantidad}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getById(id): Observable<Plato> {
    return this.http.get<Plato>(`${this.urlEndPoint}/id/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
