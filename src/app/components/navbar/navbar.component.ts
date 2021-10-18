import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

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

}
