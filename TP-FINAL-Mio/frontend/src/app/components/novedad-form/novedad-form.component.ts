import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NovedadService } from '../../services/novedad.service';
import { Novedad } from '../../models/novedad';
import { CommonModule } from '@angular/common';
import { AlquilerService } from '../../services/alquiler.service';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';
import { Alquiler } from '../../models/alquiler';
import { NovedadComponent } from '../novedad/novedad.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './novedad-form.component.html',
  styleUrl: './novedad-form.component.css',
})
export class NovedadFormComponent {
  novedad: Novedad = new Novedad();
  alquiler!: any;
  alquileres!: Array<any>;

  constructor(
    private novedadService: NovedadService,
    private alquilerService: AlquilerService,
    private propietarioService: PropietarioService
  ) {
    console.log(this.novedad);
    this.validarAlquileres();
  }

  validarAlquileres() {
    let idUsaurio = sessionStorage.getItem('userid') ?? ''; //guardo el iduser de sseionStorage
    this.propietarioService
      .getPropietarioByIdUsuario(idUsaurio) //
      .subscribe((propietario: Propietario) => {
        let idPropietario = propietario._id;
        this.alquilerService
          .getAlquilerbyIdPropietario(idPropietario)
          .subscribe((alquileres: Array<Alquiler>) => {
            this.alquileres = alquileres;
          });
      });
  }

  createNovedad() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Corrobora que tus datos sean correctos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.novedad.local = this.alquiler.local._id;
        this.novedad.propietario = this.alquiler.propietario._id;

        this.novedadService.createNovedad(this.novedad).subscribe((resp) => {
          Swal.fire({
            title: 'Novedad Enviada!',
            text: 'Pronto lo resolveremos, gracias!',
            icon: 'success',
          });
          console.log(resp);
          this.novedad = new Novedad();
        });
      }
    });
  }
}
