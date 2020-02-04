import { Injectable } from '@angular/core';
import { Usuario } from '../modals/usuario.modal';
import { Storage } from '@ionic/storage';
const DB_NAME="db_last";

@Injectable({
  providedIn: 'root'
})
export class MydbserviceService {

  constructor(private storage: Storage) { }
  addItem(usuario:Usuario): Promise<any>{
    return this.storage.get(DB_NAME).then((data:Array<Usuario>)=>{
      if(data){
      if(data.length < 1){
        console.log(usuario);
        return this.storage.set(DB_NAME,[usuario]);
      }}else{
        console.log(usuario);
        return this.storage.set(DB_NAME,[usuario]);
      }
    });
  }
  getItem():Promise<Usuario[]>{
    return this.storage.get(DB_NAME);
  }
  delete(nombreU:String){
    return this.storage.get(DB_NAME).then((usuarios: Usuario[])=>{
      if(usuarios.length === 0){
        return null;
      }
      let eliminados:Usuario[] = [];
      for(let user of usuarios){
        if(nombreU !== user.usuario){
          eliminados.push(user);
        }
      }
      this.storage.set(DB_NAME,eliminados);

    });
  }
}
