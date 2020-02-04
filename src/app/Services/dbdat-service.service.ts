import { Injectable } from '@angular/core';
import { Materia } from '../modals/materias.modal';
import { Usuario } from '../modals/usuario.modal';

@Injectable({
  providedIn: 'root'
})
export class DbdatServiceService {
  private materia: Materia;
  private usuario: Usuario;
  constructor() { }
  getMateria(){
    return this.materia;
  }
  getUsuario(){
    return this.usuario;
  }
  setMateria(datos:Materia){
    this.materia=datos;
  }
  setUsuario(datos:Usuario){
    this.usuario=datos;
  }
}
