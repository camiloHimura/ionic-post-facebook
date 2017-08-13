import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { LoadPage } from './../load/load';

import { AuthProvider } from '../../providers/auth/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoadFileProvider } from './../../providers/load-file/load-file';
import { File } from './../../interfases/file.interfase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  posts: any[];
  areTherePost: boolean = true;

  constructor(public auth: AuthProvider,
              public lf: LoadFileProvider,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private socialSharing: SocialSharing) {
    this.posts = [];
    this.lf.showImg()
  }

  logIn(){
    this.auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this.auth.displayName());
  }

  logOut(){
    this.auth.signOut();
  }

  share(post: File){
    console.log(post);
    this.socialSharing.shareViaFacebook(post.title, post.img)
        .then(() => {
          this.presentToast('Imagen publicada');
        }).catch((error) => {
          console.log(error)
          this.presentToast('Ocurrio un error intentalo nuevamente 4');
        });
  }

  doInfinite(infiniteScroll){
    this.lf.showImg()
        .subscribe((info) =>{
          console.log(info)
          this.areTherePost = !info.finished;
          infiniteScroll.complete();
        })
  }

  openModal(){
    let modal = this.modalCtrl.create(LoadPage);
    modal.present();
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      closeButtonText: 'Ok',
      showCloseButton: true,
      duration: 3000
    }).present();
  }

}
