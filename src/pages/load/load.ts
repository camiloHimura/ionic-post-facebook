import { OutputType } from '@angular/core/src/view/types';
import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { LoadFileProvider } from './../../providers/load-file/load-file';

import { File } from './../../interfases/file.interfase';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html'
})

export class LoadPage {

  title:string = '';
  imgPreview:string = '';
  img:string = '';

  constructor(private camera: Camera,
              private platform: Platform,
              private lf: LoadFileProvider,
              private viewCtrl: ViewController,
              private imagePicker: ImagePicker,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  showCamera(){
    if(!this.platform.is('cordova')){
      this.presentToast('Estamos en pc');
      return;
    }
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.img = imageData;
    }, (err) => {
      this.presentToast('info: ' + err);
    });
  }

  selectPhoto(){
    if(!this.platform.is('cordova')){
      this.presentToast('Estamos en pc');
      return;
    }
    let options:ImagePickerOptions = {
      quality: 50,
      outputType: 1,
      maximumImagesCount: 1,
    };
    this.imagePicker.getPictures(options).then((results: any[]) => {

      results.map((imageData) => {
        this.imgPreview = 'data:image/jpeg;base64,' + imageData;
        this.img = imageData;

      })
    }, (err) => { 
      this.presentToast('Error seleccion: ' + err);
    });
  }

  createPost(){
    let loading = this.presentLoading();
    let file: File = {
      img: this.img,
      title: this.title
    }
    this.lf.loadImg(file).subscribe(() =>{
      loading.dismiss();
      this.closeModal();
    },
    (error) =>{
        this.presentToast(`Error: ${error}`);
    })
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      closeButtonText: 'Ok',
      showCloseButton: true,
      duration: 3000
    });
    toast.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Genios trabajando...'
    });
    loader.present();
    return loader;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
