import { Component } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';

import { FarmavelProvider } from '../../providers/farmavel';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: any;

  constructor(public navCtrl: NavController, private app: App, private farmavelProvider: FarmavelProvider) {

    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
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
