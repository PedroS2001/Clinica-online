import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-historiaclinica',
  templateUrl: './historiaclinica.component.html',
  styleUrls: ['./historiaclinica.component.css']
})
export class HistoriaclinicaComponent implements OnInit, OnChanges {


  @Input() usuario:any;

  constructor(public auth:AuthService, public afs:FirebaseService) {
   }

  ngOnInit(): void {
    this.miHistoria();
  }

  ngOnChanges()
  {
    this.miHistoria();
    // this.usuario = this.usuario;
  }

  historiasPaciente:any;
  miHistoria()
  {
    this.historiasPaciente = [];
    this.afs.listaHistorias.forEach( (historia:any) => {
      if(historia.data.idPaciente == this.usuario.id)
      {
        console.info('usuario',this.usuario);
        this.historiasPaciente.push(historia.data);
      }
      else{console.info('NO')};
      
    });
    console.info(this.historiasPaciente);
    this.separar();
  }

  keys:any;
  separar()
  {
    this.keys= [];
    let juan:any = [];
    this.historiasPaciente.forEach( (element:any, index:number) => {

      juan = {
        dinamicoUno : element.dinamicoUno.clave,
        dinamicoDos : element.dinamicoDos.clave,
        dinamicoTres : element.dinamicoTres.clave
      }
      console.info(juan);
      this.keys.push(juan);
    });

    console.info(this.keys);

  }


}
