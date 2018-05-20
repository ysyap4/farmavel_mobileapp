import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { FarmavelProvider } from '../../providers/farmavel';

/**
 * Generated class for the AuthenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  this_medicine: any;
  get_medicine: any = null;
  searchedMedicine: any;
  authenticationForm: FormGroup;
  token: any;
  pushed: any;

  constructor(public navCtrl: NavController, private app: App, private formBuilder: FormBuilder, private farmavelProvider: FarmavelProvider) {

    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.authenticationForm = this.formBuilder.group({
      medicine: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave AuthenticationPage');
  }

  searchMedicine() {

    console.log("click");
    console.log(this.authenticationForm.get('medicine').value);
    this.farmavelProvider.setSessionData("searchedMedicine", this.authenticationForm.get('medicine').value);

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
      "medicine" : this.authenticationForm.get("medicine").value
    }
 
    this.farmavelProvider.postData(params, "check_medicine_information").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if(response.status == "success") {
        this.get_medicine = response.data;
      }
      else if (response.status == "invalid") {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
        // this.farmavelProvider.clearSessionData();
        // this.app.getRootNav().setRoot('LoginPage');
      }
      else {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });

  }

  check_medicine_information(get_medicine) {
    this.pushed = true;
    this.navCtrl.push('InformationPage', {
      get_medicine: get_medicine
    });
  }

}
