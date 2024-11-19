import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NovedadComponent } from '../novedad/novedad.component';
import { ContactoListComponent } from '../contacto-list/contacto-list.component';
import { ConsultaService } from '../../services/consulta.service';
import { NovedadService } from '../../services/novedad.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NovedadComponent,
    ContactoListComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  numeroMensajesNoLeidos: number = 0;
  numeroNotificacionesNoLeidas: number = 0;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private consultaService: ConsultaService,
    private novedadService: NovedadService
  ) {}

  ngOnInit() {
    // Suscribirse al observable para obtener actualizaciones en tiempo real de mensajes/contacto
    this.consultaService.unreadCount$.subscribe((count) => {
      this.numeroMensajesNoLeidos = count;
    });
    // Suscribirse al observable para obtener actualizaciones en tiempo real de notificaciones/novedades
    this.novedadService.unreadCount$.subscribe((count) => {
      this.numeroNotificacionesNoLeidas = count;
    });
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
