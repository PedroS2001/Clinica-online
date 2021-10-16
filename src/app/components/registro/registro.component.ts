import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public esPaciente:any = true;
  public formulario!: FormGroup;

  constructor(private fb: FormBuilder, private afs: FirebaseService, private storage: AngularFireStorage) { }

  ngOnInit(): void {

    if(!this.esPaciente)
    {
      this.formulario = this.fb.group({
        'nombre': ['', Validators.required],
        'apellido': ['', Validators.required],
        'edad': ['', [Validators.required, Validators.min(0), Validators.max(150)]],
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        // 'imagen': ['', [Validators.required]],
        'especialidad': ['', [Validators.required]],
      });
    }
    else
    {
      this.formulario = this.fb.group({
        'nombre': ['', Validators.required],
        'apellido': ['', Validators.required],
        'edad': ['', [Validators.required, Validators.min(0), Validators.max(150)]],
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        // 'imagen': ['', [Validators.required]],
        'obrasocial': ['', Validators.required],
        // 'image': ['', [Validators.required]]
      });
    }

    
  }

  pepe!:any;
  enviar()
  {
    console.info('VALORES', this.formulario.getRawValue());
    console.info('FORMULARIO', this.formulario);

    let file : any = (<HTMLInputElement> document.getElementById("imagen"));
    // let storageRef = this.storage.storage.ref();
    // let ref = storageRef.child(nombre);
    this.pepe = file.files[0];
    console.info('FILE',file);
    console.info('IMG',this.pepe);
    // if(this.formulario.status == 'VALID')
    // {
    //   this.afs.AgregarEspecialista(this.formulario.getRawValue());
    //   console.log("Deberia andar");
    // }



  }
  
  async pedro(nombre:any)
  {
    let file : any = (<HTMLInputElement> document.getElementById("imagen"));
    let storageRef = this.storage.storage.ref();
    let ref = storageRef.child(nombre);
    let pepe = file.files[0];
    console.info('FILE',file);
    console.info('IMG',pepe);
    //let file = (<HTMLInputElement> document.getElementById('imagen')).value;


    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });

  }

}
