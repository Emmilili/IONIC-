import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


export const firebaseConfig={
  apiKey: "AIzaSyAyvmeeFnl-uE6hs12aKhmyXMOJD32IDRg",
  authDomain: "practica-26ad2.firebaseapp.com",
  databaseURL: "https://practica-26ad2.firebaseio.com",
  projectId: "practica-26ad2",
  storageBucket: "practica-26ad2.appspot.com",
  messagingSenderId: "238236989904",
  appId: "1:238236989904:web:6a7937eb67e8905e3161d5"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    SpeechRecognition,
    AlertController,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
