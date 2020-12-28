import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from '../model/pedido';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private urlEndPoint: string = 'http://localhost:9898/pedido';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.urlEndPoint}/all`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getById(id): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.urlEndPoint}/id/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  create(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.urlEndPoint}/create`, pedido, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.urlEndPoint}/delete/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
