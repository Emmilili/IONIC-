import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataServiceService } from '../services/data-service.service';
import { Materia } from '../modals/materias.modal';
import { Usuario } from '../modals/usuario.modal';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  public usuario: Usuario;
  public materias: Materia[]=[];
  constructor(private dataService:DataServiceService,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.usuario=this.dataService.getUsuario();
    this.firebase.tenerMaterias(this.usuario.id).subscribe(data=>{
      this.materias=data;
    });
  }

}
