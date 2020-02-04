import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modals/usuario.modal';
import { MydbserviceService } from '../services/db_lastservice.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbdatServiceService } from '../services/dbdat-service.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Materia } from '../modals/materias.modal';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  async ngOnInit(){
    this.usuarioDB = await this.mydbService.getItem();
    if(this.usuarioDB[0]!==null){
      this.firebase.obtenerUsuario(this.usuarioDB[0].id).subscribe(user=>{
        if(this.usuarioDB[0].pass=== user.pass){
          this.tts.speak('Bienvenido '+this.usuarioDB[0].nombre)
          .then(() => this.dataService.setUsuario(user))
          .catch((reason: any) => console.log(reason));
          this.router.navigate(['/list']);
        }else{
          this.alertController.create({
            message:"no hay el usuario"
          })
        }
      })
     
    }
  }
  public usuario:Usuario=  <Usuario>{};
  public usuarioDB:Usuario[]= [];
  public usuario2:Usuario;

  constructor(public mydbService: MydbserviceService,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    public dataService: DbdatServiceService,
    private tts: TextToSpeech,
    private firebase: FirebaseService
    ) {}

  public async alerta(mensaje:string){
    const alerta= await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons:[
        {
          text: 'OK',
          handler:()=>{
            console.log('ok')
          }
        }
      ]
    });
    alerta.present();
  }
  public async toast(mensaje: string){
    const toast= await this.toastController.create({
      message: mensaje,
      duration: 2000  
    });
    toast.present();
  } 
  async crearUsuario(){
    
    
    let us:Usuario={
      nombre: 'Emilia',
      pass:'123',
      usuario:'Emilia',
      telefono:70163895
    }
    
    console.log(us);
    
    await this.firebase.crearUsuario(us);

  } 
  async crearMaterias(){
    let id:number; 
    this.firebase.obtenerLogin(this.usuario.usuario).subscribe(user=>{
      console.log(user);
      id= user[0].id;
      let materia1:Materia={
        cel_docente:65632016,
        docente:'Mendez',
        id:'samu',
        id_usuario:id,
        materia:"Fisica",
        nota:50
      }
      let materia2:Materia={
        cel_docente:65632016,
        docente:'Mendez',
        id:'samu_1',
        id_usuario:id,
        materia:"Matematica",
        nota:70
      }
      let materia3:Materia={
        cel_docente:65632016,
        docente:'Mendez',
        id:'samu_2',
        id_usuario:id,
        materia:"Quimica",
        nota:80
      }
      this.firebase.crearMateria(materia1);
      this.firebase.crearMateria(materia2); 
      //this.firebase.crearMateria(materia3);     
    });
    
    //await this.firebase.crearMateria(materia3);
    
  }
  public async login(){
    this.firebase.obtenerLogin(this.usuario.usuario).subscribe(user=>{
      console.log(user);
      
        console.log(user+" hola");
        this.usuario2= user[0];
        if(this.usuario.pass===this.usuario2.pass){
          this.mydbService.addItem(this.usuario2);
          this.toast('Usuario Autentificado Correctamente, Bienvenido '+this.usuario2.nombre);
        }
         
    }
    );
    
  }

}

