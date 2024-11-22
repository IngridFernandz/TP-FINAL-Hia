import { Component } from '@angular/core';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-local',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,RouterModule],
  templateUrl: './form-local.component.html',
  styleUrl: './form-local.component.css'
})
export class FormLocalComponent {
  filtro:string="";
  local:Local;
 
  file: { base64: string, safeurl: SafeUrl | null };
  accion:string="new";
  constructor(private localService: LocalService,private router:Router,
    private activateRoute: ActivatedRoute,private domSanitizer: DomSanitizer){
  this.file={base64: '', safeurl: null};
  this.local=new Local;
  } 
  Registrar(): void {
    if (this.accion === 'new') {
    this.localService.createLocal(this.local).subscribe(
      (result:any) =>{
        if(result.status==1)
          {
            alert("Local guardado correctamente")
          }
      },
      error=>{
        console.log(error);
      }
    
     ); 
  }
  else {
    this.localService.updateLocal(this.local).subscribe(
      (result)=>{
        if(result.status==1)
          {
            alert("Local actualizado correctamente") 
          }
      },
      (error)=>{
        console.error('Error al actualizar el Local:', error);
      }
    );

  }
  console.log(this.filtro);
  this.router.navigate(['locales',this.filtro ]);
  }
  ngOnInit():void{
  this.activateRoute.params.subscribe(params=>{
    this.filtro=params['filtro'];
    console.log(this.filtro);
    if (params['id'] == "0"){
      this.accion = "new";
      }else{
      this.accion = "update";
      this.cargarLocal(params['id']);
     
      }
  });
  
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if(file)
      {
        const reader = new FileReader();
        reader.onload = () => {
          let base64 = reader.result as string;
          this.local.imagen=base64;
          let safeurl:SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(base64);
          this.file.base64 = base64;
          this.file.safeurl = safeurl;
          };
          reader.readAsDataURL(file);
          console.log(file);
      }   
      }
      cargarLocal(id:string) {
        this.localService.getLocal(id).subscribe
        (
          (data) =>{
            this.local=data[0];
            console.log(this.local);
           },
          error=>{
            console.log('Error al cargar el Local:', error);
          }
        )
    }
  }


