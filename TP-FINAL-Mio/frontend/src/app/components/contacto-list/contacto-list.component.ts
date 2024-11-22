import { Component } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-list.component.html',
  styleUrl: './contacto-list.component.css',
})
export class ContactoListComponent {
  consultas!: Array<any>;

  constructor(private consultaService: ConsultaService) {
    this.obteneCconsultas();
  }

  obteneCconsultas() {
    return this.consultaService.getConsultas().subscribe((data) => {
      this.consultas = data;
      this.actualizarNotificacionesNoLeidas();
    });
  }

  //Boton que cambia el estado de Novedad a resuelto y codigo de sweet
  actualizarContacto(consulta: any): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'El mensaje fue leido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        let objconsulta = { ...consulta }; //Se crea una copia de la consulta
        objconsulta.estado = true;

        this.consultaService.updateConsulta(objconsulta).subscribe(
          (data) => {
            console.log('consulta actualizada correctamente:', data);
            this.obteneCconsultas(); //Para refrescar estado desde front y back
            Swal.fire({
              title: 'Listo!',
              text: 'Gracias!',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error al actualizar consulta:', error);
          }
        );
      }
    });
  }

  actualizarNotificacionesNoLeidas() {
    //Aumentar el numero sin refrescar pagina
    const count = this.consultas.filter((c) => !c.estado).length;
    this.consultaService.updateUnreadCount(count);
  }

  handleNotificationClick(event: Event) {
    event.stopPropagation();
  }
}
