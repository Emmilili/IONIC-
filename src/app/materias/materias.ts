import { Component, OnInit } from '@angular/core';
import { DbdatServiceService } from '../services/dbdat-service.service';
import { Usuario } from '../modals/usuario.modal';
import { FirebaseService } from '../services/firebase.service';
import { Materia } from '../modals/materias.modal';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  public usuario: Usuario;
  public materias: Materia;
  constructor(private dataService:DataServiceService,
    private firebase: FirebaseService,
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.usuario=this.dataService.getUsuario();
    this.materias= this.dataService.getMateria();
  }
  llamar(materia:Materia){
    this.callNumber.callNumber(materia.cel_docente.toString(), true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

  }

}
