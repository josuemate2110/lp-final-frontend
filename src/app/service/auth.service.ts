import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: string;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): string {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = sessionStorage.getItem('usuario');
      return this._usuario;
    }
    return null;
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true
    }
  }

  login(request: any): Observable<any> {
    const urlEndPoint = 'http://localhost:9898/authenticate'
    return this.http.post<any>(urlEndPoint, request, { responseType: 'text' as 'json' });
  }

  guardarUsuario(accessToken: string): void {
    this._usuario = this.obtenerDatosToken(accessToken).sub
    sessionStorage.setItem('usuario', this._usuario);
  }

  guardarToken(accessToken: string): void {
    sessionStorage.setItem('token', accessToken)
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  logout() {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
