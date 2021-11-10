import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaEspecialistasComponent } from './components/usuarios/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './components/usuarios/tabla-pacientes/tabla-pacientes.component';
import { TablaAdministradoresComponent } from './components/usuarios/tabla-administradores/tabla-administradores.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TurnosespecialistaComponent } from './components/turnos/turnosespecialista/turnosespecialista.component';
import { TurnospacienteComponent } from './components/turnos/turnospaciente/turnospaciente.component';
import { MiperfilComponent } from './pages/miperfil/miperfil.component';
import { SolicitarturnoComponent } from './pages/solicitarturno/solicitarturno.component';
import { TurnosadministradorComponent } from './components/turnos/turnosadministrador/turnosadministrador.component';
import { DetallesturnoComponent } from './components/turnos/detallesturno/detallesturno.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { SolicitarturnovdosComponent } from './pages/solicitarturnovdos/solicitarturnovdos.component';
import { HistoriaclinicaComponent } from './components/historiaclinica/historiaclinica.component';
import { SeccionpacientesComponent } from './pages/seccionpacientes/seccionpacientes.component';
import { EspecialistaComponent } from './pages/especialista/especialista.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DresaltarDirective } from './directives/dresaltar.directive';
import { DtituloDirective } from './directives/dtitulo.directive';
import { MarcoDirective } from './directives/marco.directive';



@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    RegistroComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    TablaEspecialistasComponent,
    TablaPacientesComponent,
    TablaAdministradoresComponent,
    UsuariosComponent,
    TurnosespecialistaComponent,
    TurnospacienteComponent,
    MiperfilComponent,
    SolicitarturnoComponent,
    TurnosadministradorComponent,
    DetallesturnoComponent,
    CaptchaComponent,
    SolicitarturnovdosComponent,
    HistoriaclinicaComponent,
    SeccionpacientesComponent,
    EspecialistaComponent,
    GraficosComponent,
    DresaltarDirective,
    DtituloDirective,
    MarcoDirective,
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
