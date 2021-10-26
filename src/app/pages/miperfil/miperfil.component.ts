import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  misHorarios:boolean = false;
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  listaHorarios:any = [];
  listaDias:any = [];
  listaDiario:any = [];

  mostrarHorarios()
  {
    this.misHorarios = true;
    this.listaHorarios = this.auth.currentUser.horarios;
    this.listaDias = this.auth.currentUser.dias;
    this.asignarDias();
    console.info('listaDias', this.listaDias);
  }

  asignarDias()
  {
    this.listaDiario = [];
    this.listaDias.forEach((element:any, index:number) => {
      if(index == 1)
      {
        this.listaDiario.push('Lunes');
      }
      else if(index == 2)
      {
        this.listaDiario.push('Martes');
      }
      else if(index == 3)
      {
        this.listaDiario.push('Miercoles');
      }
      else if(index == 4)
      {
        this.listaDiario.push('Jueves');
      }
      else if(index == 5)
      {
        this.listaDiario.push('Viernes');
      }
      else if(index == 6)
      {
        this.listaDiario.push('Sabado');
      }
      
    });
  }



  pedro()
  {
    console.log(this.listaHorarios);
  }

  

}
