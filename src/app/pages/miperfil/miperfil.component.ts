import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  constructor(public auth:AuthService, private afs:FirebaseService) { }
  
  ngOnInit(): void {
  }

  misHorarios:boolean = false;  //flag para que aparezcan los horarios
  //Listas que se guardaran en la base de datos despues de las modificaciones
  nuevaListaDias:any = [];      
  nuevaListaHorarios:any = [];  


  listaHorarios:any = [];   //LISTA CON TODOS LOS HORARIOS POSIBLES
  listaDias:any = [];       //LISTA CON LOS TODOS INDICES DE LA SEMANA EN LA BBDD (de 0 a 6, de domingo a sabado)
  listaDiario:any = [];     //LISTA DE TODOS DIAS DE LA SEMANA (LUNES,MARTES,MIERCOLES)

  //Flags para que se elimine el domingo para imprimir en pantalla, y luego se agregue antes de modificar en la bd
  flag = true;
  flag2 = true;
  mostrarHorarios()
  {
    this.misHorarios = true;
    
    this.listaHorarios = this.auth.currentUser.horarios;
    this.listaDias = this.auth.currentUser.dias;
    this.asignarDias();
    console.info('listaDias', this.listaDias);
    if(this.flag)
    {
      this.listaDias.shift();
      this.flag = false;
    }
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


  levantarDatosCheckboxDias()
  {
    this.nuevaListaDias = this.listaDias;
    let element = (<any> document.getElementsByName('checkDias'));
    element.forEach( (item:any, index:number) => {
      this.nuevaListaDias[index] = item.checked;
    });

    //Agrega un elemento con el valor 'false' al comienzo del array. Representaria el domingo
    if(this.flag2)
    {
      this.nuevaListaDias.unshift(false);
      this.flag2 = false;
    }
    console.info('listaoDias', this.nuevaListaDias);
  }

  levantarDatosCheckboxHoras()
  {
    let element = (<any> document.getElementsByName('checkboxs'));
    element.forEach( (item:any, index:number) => {
      this.nuevaListaHorarios[index] = item.checked;
      // console.log('checkeado?' + item.checked + ' indice ' + index);
    });

    console.info('listaodHORARIO', this.nuevaListaHorarios);
  }
  
  actualizar()
  {
    this.levantarDatosCheckboxDias();
    this.levantarDatosCheckboxHoras();
    // this.nuevaListaDias.push(false,false,false,false,false,false,false);
    // this.nuevaListaHorarios.push(false,false,false,false,false,false,false,false,false,false,false);

    let documento = '';
    this.afs.arrayEspecialistas.forEach( (element:any) => {
      if(element.data.mail == this.auth.currentUser.mail)
      {
        documento = element.id;
      }
    });

    this.afs.updateHorarios(documento,this.nuevaListaHorarios);
    this.afs.updateDias(documento, this.nuevaListaDias);
    // this.nuevaListaDias.unshift(false);
    // this.listaDias.pop();

    /*console.log('Se modificaria el siguiento documento... colection especialistas doc ' + documento);
    console.log('Se le asignarian los siguientes valores ');*/
    console.log('NUEVOS DIAS ' + this.nuevaListaDias);
    console.log('NUEVOS HORARIOS ' + this.nuevaListaHorarios);



  }

  muestraHistoria:boolean  = false;
  verHistoriaClinica()
  {
    this.muestraHistoria = true;
  }

}
