import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public auth:AuthService) { }

  tipoRegistro!:string;

  ngOnInit(): void {
    this.tipoRegistro = 'especialista';
  }

  cambiarValor(valor:string)
  {
    this.tipoRegistro = valor;
  }

}
