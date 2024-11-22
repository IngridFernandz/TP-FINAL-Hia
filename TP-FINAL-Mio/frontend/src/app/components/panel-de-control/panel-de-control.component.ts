import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { Pago } from '../../models/pago';
import { PagoService } from '../../services/pago.service';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ɵBrowserAnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-panel-de-control',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxChartsModule],
  templateUrl: './panel-de-control.component.html',
  styleUrl: './panel-de-control.component.css'
})
export class PanelDeControlComponent implements OnInit{
  
  pagos!: Array<Pago>;
  locales!: Array<Local>;

  localesAlquilados!: Array<Local>;
  localesNoAlquilados!: Array<Local>;
  localesHabilitados!: Array<Local>;
  localesNoHabilitados!: Array<Local>;
  todosLosLocales!: Array<Local>;

  pagosPorMes!: Array<Pago>;
  todosLosPagos!: Array<Pago>;

  mes!: string;
  constructor(private localService: LocalService, private pagoService: PagoService, private router: Router){

  }

  view: [number, number] = [900, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  localesAlquiladosChart: any[] = [];
  pagosChart: any[] = [];
  todosLosPagosChart: any[] = []; // Nuevo arreglo para la nueva gráfica de todos los pagos
  localesHabilitadosChart: any[] = []; // Nuevo arreglo para la nueva gráfica de locales habilitdos
  todosLosLocalesChart: any[] = []; // Nuevo arreglo para la todos los locales

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.obtenerLocales();
    this.obtenerPagos();
    this.obtenerTodosLosPagos(); // Llama al nuevo método al inicializar el componente
  }

  obtenerLocales(): void {
    this.localService.getLocales().subscribe(
      (data: any) => {
        this.locales = data;
        console.log(this.locales);
        this.clasificarLocales();
        this.actualizarDatosGraficoLocalesAlquilados();
        this.actualizarDatosGraficoLocalesHabilitados();
        this.actualizarDatosGraficoTodosLosLocales();
      },
      error => {
        console.log('Error al obtener locales:',error);
      }
    );
  }

  obtenerPagos(): void {
    this.pagoService.getPagos().subscribe(
      (data: any) => {
        this.pagos = data;
        console.log(this.pagos);
        //this.filtrarPagosPorMes(this.mes);
        //this.actualizarDatosGraficoPago();
      },
      error => {
        console.log('Error al obtener pagos:',error);
      }
    );
  }

  obtenerTodosLosPagos(): void {
    this.pagoService.getPagos().subscribe(
      (data: any) => {
        this.todosLosPagos = data;
        console.log('Todos los pagos:', this.todosLosPagos);
        this.actualizarDatosGraficoTodosLosPagos(); // Llama al método para actualizar la nueva gráfica
      },
      error => {
        console.log('Error al obtener todos los pagos:', error);
      }
    );
  }

  clasificarLocales(): void {
    this.localesAlquilados = this.locales.filter(local => local.alquilado);
    this.localesNoAlquilados = this.locales.filter(local => !local.alquilado);
    this.localesHabilitados = this.locales.filter(local => local.habilitado);
    this.localesNoHabilitados = this.locales.filter(local => !local.habilitado);
  }

  filtrarPagosPorMes(mes: string): void {
    // Crear un mapa de meses para asegurar la correcta comparación
    const mesesMap: { [key: string]: number } = {
      Enero: 0,
      Febrero: 1,
      Marzo: 2,
      Abril: 3,
      Mayo: 4,
      Junio: 5,
      Julio: 6,
      Agosto: 7,
      Septiembre: 8,
      Octubre: 9,
      Noviembre: 10,
      Diciembre: 11
    };
  
    // Filtrar los pagos por el mes seleccionado
    this.pagosPorMes = this.pagos.filter(pago => {
      const fechaPago = new Date(pago.fechaDePago);
      const mesPago = fechaPago.getMonth();
      return mesPago === mesesMap[mes];
    });
  
    // Después de filtrar por mes, actualizamos los datos del gráfico de pagos
    this.actualizarDatosGraficoPago();
  }
  
  

  actualizarDatosGraficoLocalesAlquilados(): void {
    const totalAlquilados = this.localesAlquilados.length;
    const totalNoAlquilados = this.localesNoAlquilados.length;

    this.localesAlquiladosChart = [
      {
        "name": "Alquilados",
        "value": totalAlquilados
      },
      {
        "name": "No Alquilados",
        "value": totalNoAlquilados
      }
    ];
  }

  actualizarDatosGraficoLocalesHabilitados(): void {
    const totalHabilitados = this.localesHabilitados.length;
    const totalNoHabilitados = this.localesNoHabilitados.length;

    this.localesHabilitadosChart = [
      {
        "name": "Habilitados",
        "value": totalHabilitados
      },
      {
        "name": "No Habilitados",
        "value": totalNoHabilitados
      }
    ];
  }

  actualizarDatosGraficoTodosLosLocales(): void {
    const totalAlquilados = this.localesAlquilados.length;
    const totalNoAlquilados = this.localesNoAlquilados.length;
    const totalHabilitados = this.localesHabilitados.length;
    const totalNoHabilitados = this.localesNoHabilitados.length;

    this.todosLosLocalesChart = [
      {
        "name": "Alquilados",
        "value": totalAlquilados 
      },
      {
        "name": "No Alquilados",
        "value": totalNoAlquilados
      },
      {
        "name": "Habilitados",
        "value": totalHabilitados
      },
      {
        "name": "No Habilitados",
        "value": totalNoHabilitados
      }
    ];
  }


  actualizarDatosGraficoPago(): void {
    const pagosTotales = this.pagos.length;
    const pagosDeMes = this.pagosPorMes.length;
  
    this.pagosChart = [
      {
        "name": "Pagos de este Mes",
        "value": pagosDeMes
      },
      {
        "name": "Pagos de otros Meses",
        "value": pagosTotales - pagosDeMes
      }
    ];
  }
  
  actualizarDatosGraficoTodosLosPagos(): void {
    const todosLosPagosTotales = this.todosLosPagos.length;

    this.todosLosPagosChart = [
      {
        "name": "Todos los Pagos",
        "value": todosLosPagosTotales
      }
    ];
  }
  
}
