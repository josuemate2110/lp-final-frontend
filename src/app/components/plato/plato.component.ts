import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/model/plato';
import { PlatoService } from 'src/app/service/plato.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  platos: Plato[];

  constructor(private platoService: PlatoService) { }

  ngOnInit() {
    this.platoService.getPlatos().subscribe(
      platos => this.platos = platos
    );
  }

}
