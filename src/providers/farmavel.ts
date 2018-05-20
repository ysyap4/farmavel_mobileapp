import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController, App, LoadingController } from 'ionic-angular';


@Injectable()
export class FarmavelProvider {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  url;
  loader: any;

  constructor(
    public events: Events,
    public storage: Storage,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.url = 'http://farmavel.herokuapp.com/api/'
  }

  getUser() {
    return this.http.get(this.url + 'users');
  }

  getData(action){

    return new Promise((resolve, reject) =>{
      let headers = new HttpHeaders();
      let url = this.url + action;

      this.http
        .get(url, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    });
  }

  postData(params, action){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = this.url + action;
      let body = JSON.stringify(params);

      this.http
        .post(url, body, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  putData(params, action){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = this.url + action;
      let body = JSON.stringify(params);

      this.http
        .put(url, body, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  //for user session
  getSessionData(key) {
    return this.storage.get(key).then((val) => {
      return val;
    });
  }

  setSessionData(key, value) {
    this.storage.set(key, value);
  }

  clearSessionData() {
    this.storage.clear();
  }

  showAlertDialog(title, message) {
    let dialog = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    dialog.present();
  }

  showServerErrorDialog() {
    let dialog = this.alertCtrl.create({
      title: "Server Error",
      message: "Please check your Internet connection and try again later.",
      buttons: ['OK']
    });
    dialog.present();
  }

  showProgress() {
    this.loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait..."
    });

    this.loader.present();
  }

  dismissProgress() {
    this.loader.dismiss();
  }

}
