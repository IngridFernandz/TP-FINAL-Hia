import { Component } from '@angular/core';
import { NovedadService } from '../../services/novedad.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novedad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novedad.component.html',
  styleUrl: './novedad.component.css',
})
export class NovedadComponent {
  novedades: Array<any> = [];

  constructor(private novedadService: NovedadService) {
    this.obtenerNovedades();
  }

  obtenerNovedades(): void {
    this.novedadService.getNovedades().subscribe(
      (data) => {
        this.novedades = data;
        this.actualizarNotificacionesNoLeidas(); //conteo
      },
      (error) => {
        console.error('Error al obtener Novedades:', error);
      }
    );
  }

  //Boton que cambia el estado de Novedad a resuelto
  actualizarNovedad(novedad: any): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Al aceptar aseguras que la consulta fue resuelta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        let objNovedad = { ...novedad }; //Se crea una copia de la novedad
        objNovedad.estado = true;
        objNovedad.fechaFinalizacion = new Date();
        objNovedad.propietario = novedad.propietario._id;
        objNovedad.local = novedad.local._id;

        this.novedadService.updateNovedad(objNovedad).subscribe(
          (data) => {
            console.log('Novedad actualizada correctamente:', data);
            this.obtenerNovedades(); //Para refrescar estado desde front y back
            Swal.fire({
              title: 'Listo!',
              text: 'Se guardaron los cambios',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error al actualizar Novedad:', error);
          }
        );
      }
    });
  }

  actualizarNotificacionesNoLeidas() {
    const count = this.novedades.filter((c) => !c.estado).length;
    this.novedadService.updateUnreadCount(count);
  }

  handleNotificationClick(event: Event) {
    event.stopPropagation();
  }
}
