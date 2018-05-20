import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FarmavelProvider } from '../../providers/farmavel';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private farmavelProvider: FarmavelProvider) 
  {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  onLogin() {

    this.farmavelProvider.showProgress();

    let params = {
      "email" : this.loginForm.get("email").value,
      "password" : this.loginForm.get("password").value
    };

    this.farmavelProvider.postData(params, "login").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if(response.status == "success") {
        this.farmavelProvider.setSessionData('token', response.data.remember_token);
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        this.farmavelProvider.showAlertDialog("Login Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
  }

}
