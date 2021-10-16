import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviar()
  {
    
  }

}
