import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor() { }

  tabla:string = '';

  ngOnInit(): void {
  }

  boton(tabla:string)
  {
    this.tabla = tabla;
  }

  agregarUsuario:boolean = false;
  btnAgregar()
  {
    this.agregarUsuario = true;
  }

}
