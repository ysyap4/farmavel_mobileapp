import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';

import { FarmavelProvider } from '../../providers/farmavel';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  token: any;
  get_medicine: any;
  get_user: any = null;
  pushed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private app: App, private alertCtrl: AlertController) {
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.get_medicine = navParams.get('get_medicine');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  submit_report(get_medicine) {
    this.pushed = true;
    this.navCtrl.push('ReportPage', {
      get_medicine: get_medicine
    });
  }

  make_appointment(get_medicine) {
    this.pushed = true;
    this.navCtrl.push('AppointmentPage', {
      get_medicine: get_medicine
    });
  }

}
