import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToRegistro()
  {
    this.router.navigateByUrl('/registro')
  }
  goToLogin()
  {
    this.router.navigateByUrl('/login')
  }

}
