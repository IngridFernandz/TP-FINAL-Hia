import { Local } from "./local";

export class Promocion {
    _id!: string;
    titulo!: string;
    descripcion!: string;
    fechaInicio!: string;
    fechaFin!: string;
    categoria!: string;
    local!:Local; 
    publicado!: boolean; 
    imagen!: string; 
    
    constructor(){
        this.publicado=false; 

    }
}