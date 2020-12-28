import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Bienvenido, Ingrese por favor"
  usuario: Usuario
  
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      this.router.navigate(['/platos']);
    }
  }

  login() {
    this.authService.login({ "nomuser": this.usuario.nomuser, "clave": this.usuario.clave }).subscribe(response => {
      this.authService.guardarUsuario(response);
      this.authService.guardarToken(response);
      this.router.navigate(['/platos']);
    })
  }

}
