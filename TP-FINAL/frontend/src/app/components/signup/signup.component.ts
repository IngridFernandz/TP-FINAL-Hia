import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  isEditing: boolean = false;
  selectedUsuario: Usuario | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      activo: [true],
      email: [''],
     perfil: ['']
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (res:any) => {
        this.usuarios = res.data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  crearUsuario(): void {
    const newUser: Usuario = this.usuarioForm.value;
    this.usuarioService.createUsuario(newUser).subscribe(
      (data) => {
        console.log('Usuario creado correctamente:', data);
        Swal.fire({
          text: 'registrado con exito',
          icon: 'success'
        })
        this.resetForm();
        this.getUsuarios();
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        console.log(newUser);
      }
    );
  }

  editarUsuario(): void {
    if (this.selectedUsuario) {
      const editedUser: Usuario = this.usuarioForm.value;
      this.usuarioService.editUsuario(this.selectedUsuario._id, editedUser).subscribe(
        (data) => {
          console.log('Usuario actualizado correctamente:', data);
          Swal.fire({
            text: 'registrado con exito',
            icon: 'success'
          })
          this.resetForm();
          this.getUsuarios();
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }

  eliminarUsuario(id: string): void {
    this.usuarioService.deleteUsuario(id).subscribe(
      (data) => {
        console.log('Usuario eliminado correctamente:', data);
        Swal.fire({
          text: 'eliminado con exito',
          icon: 'success'
        })
        this.getUsuarios();
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  cargarUsuarioParaEdicion(usuario: Usuario): void {
    this.isEditing = true;
    this.selectedUsuario = usuario;
    this.usuarioForm.patchValue(usuario);
  }

  cancelarEdicion(): void {
    this.isEditing = false;
    this.selectedUsuario = undefined;
    this.resetForm();
  }

  resetForm(): void {
    this.usuarioForm.reset({
      _id: '',
      usuario: '',
      password: '',
      activo: true,
      perfil: ''
    });
  }
}