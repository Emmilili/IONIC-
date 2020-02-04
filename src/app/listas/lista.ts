import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/dbdat-service.service';
import * as StringSimilarity from 'string-similarity';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Usuario } from '../Models/usuario.modal';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Materia } from '../Models/materias.modal';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private user:Usuario;
  private usuario:Usuario;
  public materias: Materia[]=[];
  constructor(private dataService:DataServiceService,
    private speechRecognition: SpeechRecognition,
    private router:Router,
    private alertController:AlertController,
    private firebase: FirebaseService) {
    
  }

  ngOnInit() {
    this.user=this.dataService.getUsuario();
    let options = {
      language: 'es-MX',
      matches: 3,
      prompt: 'Que deseas buscar',      // Android only
      showPopup: true
    }
      this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
 
        this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => console.log(hasPermission))

      // Request permissions
      this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )

        // Start the recognition process
        this.speechRecognition.startListening(options)
        .subscribe(
          (matches: string[]) =>{

            this.usuario=this.dataService.getUsuario();
            this.firebase.tenerMaterias(this.usuario.id).subscribe(data=>{
              this.materias=data;
              console.log(matches);
              let values:StringSimilarity.BestMatch;
              this.materias.forEach(element => {
                values= StringSimilarity.findBestMatch('Ver materia '+element.materia,matches);
                if(values.bestMatch.rating>0.7){
                  this.dataService.setMateria(element);
                  this.router.navigate(['/materias']);
                }
              });
              let mejorResultadoNotas: StringSimilarity.BestMatch = StringSimilarity.findBestMatch('ir notas', matches);
            
              if( mejorResultadoNotas.bestMatch.rating> 0.7) {
                this.router.navigate(['/notas']);
              }
            });
              //this.speechRecognition.stopListening()
              
              
              
            },
          (onerror) => console.log('error:', onerror)
        )
  }
 
  public async invocarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });
    alert.present();
  }

}
