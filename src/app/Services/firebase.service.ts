import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../modals/usuario.modal';
import { Materia } from '../modals/materias.modal';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public afdb: AngularFireDatabase) { }
  crearUsuario(usuario:Usuario){
    usuario.id=Date.now();
    return this.afdb.database.ref('usuario/'+usuario.id).set(usuario);
  }
  obtenerUsuario(id:number){
    return this.afdb.object<Usuario>('usuario/'+id).valueChanges();
  }
  obtenerUsuarios(){
    return this.afdb.list<Usuario>('usuario').valueChanges();
  }
  crearMateria(materia:Materia){
    return this.afdb.database.ref('materia/'+materia.id).set(materia);
  }
  obtenerMateria(id:string){
    return this.afdb.object<Materia>('materia/'+id).valueChanges();
  }
  obtenerLogin(usuario:string){
    return this.afdb.list<Usuario>('usuario',ref=> ref.orderByChild('usuario').equalTo(usuario)).valueChanges();
  }
  obtenerMaterias(id:number){
    return this.afdb.list<Materia>('materia',ref=> ref.orderByChild('id_usuario').equalTo(id)).valueChanges();
  }
}
