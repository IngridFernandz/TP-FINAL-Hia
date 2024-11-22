import { Component } from '@angular/core';
import { PropietarioService } from '../../services/propietario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Propietario } from '../../models/propietario';


@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css'
})
export class PropietarioComponent {
  propietarios!: Array<Propietario>;

  constructor(private propietarioService: PropietarioService, private router: Router) {
    this.getPropietarios();
  }

  getPropietarios() {
    this.propietarioService.getPropietarios().subscribe(data => {
      this.propietarios = data;
    });
  }

  createPropietario() {
    this.router.navigate(['formpropietario', '0']);

  }

  deletePropietario(id: String) {
    this.propietarioService.deletePropietario(id).subscribe(() => {
      this.getPropietarios();
    });
  }

  editPropietario(propietario: Propietario) {
    this.router.navigate(['formpropietario', propietario._id])
  }

}


