import { Injectable } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';


@Injectable({
  providedIn: 'root'
})
export class ApiFacebookService {

  constructor(private fb: FacebookService) {
    this.iniciarFb();

  }
  ngOnInit(): void {

  }
  postFb(message1: string, message2: string) {
    var apiMethod: ApiMethod = "post";
    this.fb.api(
      //ID DE LA PAGINA DE FACEBOOK
      '/346995121835378/feed',
      apiMethod,
      {
      "message": message1+ '\n' +message2, 
        //Token generado en APIGRAPH
        "access_token": "EAARJ1RoFwVgBOZBS2AnlwrrJJZAh1GZAfbtCb2zTTsAZBnSldfY4kdiZCIHlaZBuYIwY2LHjrFG3RkJItVDWyxq8LOtl0TN1QgtYZCYv944jMjqw3yufZAULNbffBl6fZBKtRco6I4ZAvLScKX6tYZCJZCq9kfZCQXCmGcMz4dGhWuoOEXsAw0HTxGfhX0ihQWbmQxwBEilNb0LAvjvN5kEsOSGWHbWbj"
      },
    ).then(response => {
      console.log('LA PUBLICACION SE HA REALIZADO CON EXITO', response);
    }).catch(error => {
      console.error('NO SE HA PODIDO REALIZAAR LA PUBLICACION', error);
    })
  }

  iniciarFb() {
    let initParams: InitParams = {
      //ID DE LA APP
      appId: '1207079520289112',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v20.0'
    };
    this.fb.init(initParams);
  }


}
