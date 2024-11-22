import { Component, OnInit } from '@angular/core';
import { PropietarioService } from '../../services/propietario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Propietario } from '../../models/propietario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-form-propietario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-propietario.component.html',
  styleUrl: './form-propietario.component.css',
})
export class FormPropietarioComponent implements OnInit {
  formPropietario!: FormGroup;
  nuevo!: Boolean;
  usuarios: Usuario[] = [];

  constructor(
    private propietarioService: PropietarioService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.getUsuarios(),
      (this.formPropietario = this.formBuilder.group({
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        dni: ['', Validators.required],
        domicilio: ['', Validators.required],
        telefono: [0, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        idUsuario: ['', Validators.required],
      }));
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] == 0) {
        this.nuevo = true;
      } else {
        this.nuevo = false;
        this.getPropietario(params['id']);
      }
    });
  }
  getPropietario(id: String) {
    this.propietarioService
      .getPropietario(id)
      .subscribe((data: Propietario) => {
        this.formPropietario.setControl('_id', new FormControl('')),
          this.formPropietario.patchValue({
            _id: data._id,
            apellido: data.apellido,
            nombre: data.nombre,
            dni: data.dni,
            email: data.email,
            telefono: data.telefono,
          });
      });
  }

  addPropietario() {
    this.propietarioService
      .addPropietario(this.formPropietario.value)
      .subscribe(() => {
        this.formPropietario.reset();
        this.volverLista();
      });
  }

  editPropietario() {
    this.propietarioService
      .editPropietario(this.formPropietario.value)
      .subscribe((data) => {
        console.log(data);
        this.volverLista();
      });
  }

  volverLista() {
    this.router.navigate(['propietario']);
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data.data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
}
