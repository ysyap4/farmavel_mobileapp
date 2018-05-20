import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { FarmavelProvider } from '../../providers/farmavel';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  token: any;
  get_user: any;
  pushed: any;
  image_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private app: App) {
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter ProfilePage');
    console.log("click");

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token
    }
 
    this.farmavelProvider.postData(params, "get_user").then((result) => {
      let response: any = result;
      let image_link: any;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if (response.status == "success") {
        this.get_user = response.data;
        this.image_link = response.image_link;
      }
      else if (response.status == "invalid") {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }
      else {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
  }

  edit_profile(get_user, image_link) {
    this.pushed = true;
    this.navCtrl.push('ProfileEditPage', {
      get_user: get_user,
      image_link: image_link
    });
  }

  onLogout() {

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
    };

    this.farmavelProvider.postData(params, "logout").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if(response.status == "success") {
        this.farmavelProvider.clearSessionData();
        this.app.getRootNav().setRoot('LoginPage');
      }
      else {
        this.farmavelProvider.showAlertDialog("Logout Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
  }

}
