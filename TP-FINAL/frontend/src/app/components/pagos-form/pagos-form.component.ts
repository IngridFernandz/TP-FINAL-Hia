import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/pago';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router ,ActivatedRoute} from '@angular/router';
import { Alquiler } from '../../models/alquiler';
import { AlquilerService } from '../../services/alquiler.service';
import { LocalService } from '../../services/local.service';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';
import { CuotaService } from '../../services/cuota.service';
import { Cuota } from '../../models/cuota';

@Component({
  selector: 'app-pagos-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pagos-form.component.html',
  styleUrl: './pagos-form.component.css'
})
export class PagosFormComponent {

  cuotActual: Cuota = new Cuota();

  pago:Pago;
  estado:string;
  items: any[];
  backUrls:{};
  Alquileres:Alquiler[] = [];
  Propietarios:Propietario[] = [];
  id_alquiler="";
  id_prop="";
  montoCuota=0;
  montoPagado=0;
  //id_CuotaActual="66912fadef04eba6aad14b2c";
  constructor(private pagoService: PagoService,private cuotaService: CuotaService,private router: Router,private alquilerService: AlquilerService,private  propietarioService:PropietarioService,
    private activateRoute: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object) { 
    this.pago = new Pago();
    this.items = [];
    this.backUrls={};
    this.estado = 'pendiente';
    //this.cuotActual=new Cuota();
    this.getPropietarios();
  }
  /*ngOnInit(): void {
    this.pago = this.pagoService.obtenerPago() || new Pago();
    this.cuotActual = this.pagoService.obtenerCuota() || new Cuota();
   
    this.activateRoute.queryParams.subscribe(params=> {
      console.log(params);
      //if (isPlatformBrowser(this.platformId)) {
      const cleanUrl = window.location.pathname; 
      window.history.replaceState({}, document.title, cleanUrl);
    });
    this.activateRoute.params.subscribe(params=>{
      this.estado=params['estado'];
  });
 
  if(this.estado==='pagado')
  {   
    if (this.pago) {
      this.pago=this.pagoService.obtenerPago();
    } else {
      console.error('No se encontró información válida de pago.');
    }
   
    this.pagoService.createPago(this.cuotActual._id,this.pago).subscribe(
      (data: any) => {
        alert("Pago guardado correctamente")
        this.estado='pendiete';
        console.log(this.pago)
        this.montoPagado=data.totalPagos;
        this.cuotActual._id=data.cuotaActual._id;
        localStorage.setItem('cuotActual', JSON.stringify(this.cuotActual)); 
        this.cuotActual=data.cuotaActual;
        this.getCuota(this.cuotActual._id);
          console.log(data)
          console.log(this.cuotActual);
      },
      error => {
        console.log(error);
        
      }

    );

  }
  }*/

  ngOnInit(): void {
    this.id_alquiler = this.pagoService.obtenerAlquiler() || ""; // Obtener ID de alquiler
    this.pago = this.pagoService.obtenerPago() || new Pago();
    this.cuotActual = this.pagoService.obtenerCuota() || new Cuota();

    this.activateRoute.queryParams.subscribe(params=> {
      console.log(params);
      //if (isPlatformBrowser(this.platformId)) {
      const cleanUrl = window.location.pathname; 
      window.history.replaceState({}, document.title, cleanUrl);
    });

    this.activateRoute.params.subscribe(params => {
      this.estado = params['estado'];
      if (this.estado === 'pagado') {
        this.realizarPago();
      }
    });
  }

  realizarPago() {
    this.pago.fechaDePago = new Date();
    this.pagoService.createPago(this.cuotActual._id, this.pago).subscribe(
      (data: any) => {
        alert("Pago guardado correctamente");
        this.estado = 'pendiente';
        this.montoPagado = data.totalPagos;
        this.cuotActual._id = data.cuotaActual._id;
        this.cuotActual = data.cuotaActual;
        this.pagoService.guardarPago(this.pago);
        this.pagoService.guardarCuota(this.cuotActual);
        this.pagoService.guardarAlquiler(this.id_alquiler);
        this.getCuota(this.cuotActual._id);
      },
      error => {
        console.error(error);
      }
    );
  }



  generarPago() {
    // Actualizar la fecha de pago antes de guardar
    this.pago.fechaDePago = new Date(); // Esto asigna la fecha actual
    this.pagoService.guardarPago(this.pago);
    this.items = [
      {
        title: 'Pago de Alquiler',
        unit_price: this.pago.monto,
        quantity: 1,
      }
    ];
  
    this.backUrls = {
      success: 'https://localhost:4200/pagos-form/pagado',
      //failure: 'https://tu-sitio.com/pago-fallido',
      pending: 'https://localhost:4200/pagos-form/pendiente',
      payer_email: 'test_user_1428711992@testuser.com',
    };
  
    var paymentLink: string;
    this.pagoService.generarLinkDePago(this.items, this.backUrls).subscribe(
      (data) => {
        paymentLink = data.payment_link;
       // window.open(paymentLink, '_blank'); 
        window.location.href = data.payment_link;
      },
      (error) => {
        console.error('Error al generar el link de pago', error);
      }
    );
}
getAlquileres(){
  //if (this.id_prop) {
    this.alquilerService.getAlquilerbyIdPropietario(this.id_prop).subscribe(
      (data: any) => {
        this.Alquileres = data;
        console.log(this.Alquileres);
      },
      error => {
        console.log(error);
      }
    );
  //} else {
  //  this.Alquileres = [];
  //}


}

getPropietarios(){
  this.propietarioService.getPropietarios().subscribe(
    (data: any) => {
      this.Propietarios = data;
    console.log(this.Propietarios);
    },
    error => {
      console.log(error);
    }
  );

}



cuotas: Cuota[] = [];
ObtnerCuotasByID(){
  this.cuotaService.getCuotasAlquiler(this.id_alquiler).subscribe(
    (data:any) => {
      this.cuotas = data; 
     // this.cuotActual._id=data[0]._id;
     // this.montoCuota = data[0].monto; 
      //this.cuotActual.nroCuota=1;
     //this.getCuota(this.cuotActual._id);
    
    },
    (error) => {
      console.error('Error al obtener cuotas:', error);
  
    }
  );
this.getPrimeraCuota();
this.montoCuota = this.cuotActual.monto;
this.pagoService.guardarAlquiler(this.id_alquiler); 
}

  getPrimeraCuota(): void {
    this.cuotaService.getPrimerCuota(this.id_alquiler).subscribe(
      (data) => {
        console.log('Primera cuota:', data);
        this.cuotActual = data;
        console.log(this.cuotActual);
        this.pagoService.guardarCuota(this.cuotActual);
      },
      (error) => {
        console.error('Error al obtener la primera cuota:', error);
      }
    );
  }



 getCuota(id: string): void {
    this.cuotaService.getCuota(id).subscribe(
      (data) => {
        this.cuotActual = data;
        console.log('Cuota obtenida:', this.cuotActual);
      },
      (error) => {
        console.error('Error al obtener la cuota:', error);
      }
    );
  }


}



