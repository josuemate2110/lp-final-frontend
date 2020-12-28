import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detalle } from 'src/app/model/detalle';
import { Pedido } from 'src/app/model/pedido';
import { Plato } from 'src/app/model/plato';
import { DetalleService } from 'src/app/service/detalle.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { PlatoService } from 'src/app/service/plato.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedido: Pedido = new Pedido();
  detalle: Detalle = new Detalle();
  platos: Plato[] = [];
  id: number;

  constructor(private platoService: PlatoService, private detalleService: DetalleService, private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.platos)
  }

  getPlato() {
    let val = false;
    if (this.id > 0) {
      this.platoService.getById(this.id).subscribe(
        plato => {
          this.platos.forEach(element => {
            if (Object.values(element).indexOf(plato.nombre) > -1) {
              val = true;
              alert("El plato ya está en la lista")
            }
          });
          if (!val) {
            plato.cantidad = 1;
            this.platos.push(plato);
          }
        }
      );
    }
  }

  createPedido() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let day = mm + '/' + dd + '/' + yyyy;
    this.pedido.fecha = day;
    this.pedidoService.create(this.pedido).subscribe(response => {
      this.createDetallePedido(response);
      this.router.navigate(["/lista"])
    })
  }

  createDetallePedido(id) {
    this.platos.forEach(element => {
      this.detalle.idpedidos = id;
      this.detalle.idplatos = element.idplatos;
      this.detalle.cantidad = element.cantidad;
      this.detalle.precio = element.precio * element.cantidad;
      this.detalleService.create(this.detalle).subscribe();
    });
  }

  add(i) {
    this.platos[i].cantidad++;
  }

  remove(i) {
    if (this.platos[i].cantidad == 1) {
      this.platos.splice(i, 1)
    } else {
      this.platos[i].cantidad--;
    }
  }
}
