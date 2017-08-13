import { $$observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { File } from './../../interfases/file.interfase';

@Injectable()
export class LoadFileProvider {

  private FOLDER_IMG: string = 'img';
  //Nombre de la colecciòn firebase donde se guardan los datos 
  private POST: string = 'post';
  imgs: File[] = [];
  lastKey: string = undefined;
  private $loadImg: Subject<any> = new Subject<any>();
  private $showImg: Subject<any> = new Subject<any>();
  $observableLoad: Observable<any>;
  $observableShow: Observable<any>;

  constructor(private af: AngularFireDatabase,
              private toastCtrl: ToastController) {
    this.$observableLoad = this.$loadImg.asObservable();
    this.$observableShow = this.$showImg.asObservable();
  }

  showImg() :Observable<any> {
    this.af.list(this.POST, {
      query:{
        limitToLast: 4,
        orderByKey: true,
        endAt: this.lastKey
      }
    }).subscribe((post: any[]) => {
      console.table(post)
      if(this.lastKey){
        post.pop();
      }

      if(post.length === 0){
        this.$showImg.next({'finished': true});
        return;
      }

      this.lastKey = post[0].$key;
      let tam = post.length - 1;
      for(let i = tam; i >= 0; i--){
        this.imgs.push(post[i]);
      }
      this.$showImg.next({'finished': false});
    })
    return this.$observableShow;
  }

  loadImg(fiel: File): Observable<any> {

    let storageRef = firebase.storage().ref();
    let fileName = new Date().valueOf();

    let uploadTask:firebase.storage.UploadTask = 
            storageRef.child(`${ this.FOLDER_IMG }/${ fileName }`)
            .putString( fiel.img , 'base64', { contentType: 'image/jpg'});

    var unsubscribe =  uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot: any) => { 
        var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");
      },
      (error) => { this.presentToast(JSON.stringify(error))},
      () => {
        let url = uploadTask.snapshot.downloadURL;
        this.presentToast(JSON.stringify('Imagen cargada'));
        
        this.createPost(fiel.title, url);
        this.$loadImg.next();
        return unsubscribe();
      }
    )
    
    return this.$observableLoad;
  }

  createPost(title: string, url: string){
    let post:File = {
      img:url,
      title: title
    }

    let key = this.af.database.ref(`${this.POST}`).push(post).key;
    post.key = key;

    this.imgs.unshift(post);
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

}