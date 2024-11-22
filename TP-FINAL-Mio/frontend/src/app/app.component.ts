import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LocalesComponent } from './components/locales/locales.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { FormPropietarioComponent } from './components/form-propietario/form-propietario.component';
import { FormLocalComponent } from './components/form-local/form-local.component';
import { AlquilerCreateComponent } from './components/alquiler-create/alquiler-create.component';
import { AlquilerListComponent } from './components/alquiler-list/alquiler-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PagosFormComponent } from './components/pagos-form/pagos-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    LocalesComponent,
    PropietarioComponent,
    FormPropietarioComponent,
    FormLocalComponent,
    AlquilerCreateComponent,
    AlquilerListComponent,
    AlquilerListComponent,
    SignupComponent,
    HomeComponent,
    PagosComponent,
    PagosFormComponent,
    PanelDeControlComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
