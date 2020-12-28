import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/model/plato';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  plato: Plato = new Plato();

  titulo: string = "Crear Plato"

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void{
    console.log("hola mundo")
    console.log(this.plato)
  }

}
