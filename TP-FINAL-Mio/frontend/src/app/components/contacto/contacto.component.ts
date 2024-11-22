import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RecaptchaModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {
  formulario!: FormGroup;
  recaptchaChecked!: Boolean;
  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService
  ) {}

  ngOnInit() {
    this.crearOLimpiarForm();
  }

  executeReCaptcha(token: any) {
    //reCaptcha
    this.recaptchaChecked = true;
    console.log(token);
  }

  createConsulta() {
    if (this.formulario.valid && this.recaptchaChecked) {
      // Aca se crea la consulta si el formulario es valido
      this.consultaService
        .createConsulta(this.formulario.value)
        .subscribe((resp) => {
          this.crearOLimpiarForm();
          this.recaptchaChecked = false; // Reiniciar la bandera de reCAPTCHA
          console.log(resp);
        });
      console.log(this.formulario.value);
    } else {
      // Marca todos los campos como tocados para activar las validaciones
      this.markFormGroupTouched(this.formulario);
    }
  } //falta SWEET ALERT

  // Función para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  crearOLimpiarForm() {
    this.formulario = this.fb.group({
      nombreCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      consulta: ['', Validators.required],
      estado: [false],
    });
  }

  // getConsultas() {
  //   this.consultaService.getConsultas().subscribe(
  //     (data) => {
  //       let consulta: Consulta = new Consulta();
  //       data.forEach((element: any) => {
  //         Object.assign(consulta, element);
  //         this.consultas.push(consulta);
  //         consulta = new Consulta();
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
