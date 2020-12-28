import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Detalle } from '../model/detalle';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private urlEndPoint: string = 'http://localhost:9898/detallepedido';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getDetalles(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.urlEndPoint}/all`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getById(id): Observable<Detalle> {
    return this.http.get<Detalle>(`${this.urlEndPoint}/id/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  create(detalle: Detalle): Observable<Detalle> {
    return this.http.post<Detalle>(`${this.urlEndPoint}/create`, detalle, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Detalle> {
    return this.http.get<Detalle>(`${this.urlEndPoint}/delete/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
