import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoadPage } from '../pages/load/load';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* Angular firebase */
import { firebaseConfig } from './../config/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

/* pipes */
import { PipesModule } from './../pipes/pipes.module';

/* services */
import { LoadFileProvider } from '../providers/load-file/load-file';

/* camara */
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    LoadPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    PipesModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoadPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    Camera,
    Facebook,
    StatusBar,
    ImagePicker,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadFileProvider,
    AuthProvider,
    AuthProvider
  ]
})
export class AppModule {}
