import { Component, HostListener } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PromocionService } from '../../services/promocion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Local } from '../../models/local';
import { Promocion } from '../../models/promocion';
import { ContactoComponent } from '../contacto/contacto.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  locales!: Array<Local>;
  promociones!: Array<Promocion>;
  images = [
    'assets/images/home1.jpg',
    'assets/images/home2.jpg',
    'assets/images/home3.jpg',
  ];

  constructor(
    private localService: LocalService,
    private promocionService: PromocionService
  ) {
    this.getLocales();
    this.getPromociones();
  }

  getLocales() {
    this.localService.getLocales().subscribe((data) => {
      this.locales = data;
    });
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((data) => {
      this.promociones = data;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    if (window.pageYOffset > 100) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }

  // Método para desplazarse suavemente hacia la parte superior
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
