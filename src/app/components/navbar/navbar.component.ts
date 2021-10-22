import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, public auth:AuthService) { }

  ngOnInit(): void {
  }

  goToLogin()
  {
    this.router.navigateByUrl('/login');
  }

  goToRegistro()
  {
    this.router.navigateByUrl('/registro');
  }

  goToBienvenida()
  {
    this.router.navigateByUrl('/bienvenida');
  }

  goToUsuarios()
  {
    this.router.navigateByUrl('/usuarios');
  }

  goToMisTurnos()
  {
    this.router.navigateByUrl('/paciente/misturnos');
  }

}
