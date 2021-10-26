import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turnospaciente',
  templateUrl: './turnospaciente.component.html',
  styleUrls: ['./turnospaciente.component.css']
})
export class TurnospacienteComponent implements OnInit {

  loading = false;
  turnosDelPaciente:any = [];

  constructor(public afs:FirebaseService, private auth:AuthService){}

  ngOnInit(){

  }




}
