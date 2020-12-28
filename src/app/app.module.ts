import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlatoComponent } from './components/plato/plato.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { FormComponent } from './components/plato/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { ListaComponent } from './components/lista/lista.component';

const routes: Routes = [
  {path: '', redirectTo: '/platos', pathMatch: 'full'},
  {path: 'pedidos', component: PedidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lista', component: ListaComponent},
  {path: 'platos', component: PlatoComponent},
  {path: 'platos/create', component: FormComponent}
]

@NgModule({
  declarations: [
    PedidoComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlatoComponent,
    FormComponent,
    LoginComponent,
    ListaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
